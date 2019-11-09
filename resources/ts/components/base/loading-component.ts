import { AbstractComponent } from "./abstract-component";
import { NetworkError } from "../../network";
import { ErrorPopupTile } from "../../popup";
import { ResponseBox } from "../../bridge/gen-dtos";
import { PeriodEditorComponent } from "../period-editor";

export abstract class LoadingComponent <T> extends AbstractComponent {

    protected intervalDesc : NodeJS.Timeout = null;

    protected data : T;

    constructor (
        /**
         * Update interval in seconds
         */
        protected updateInterval : number = null
    ) {
        super ();

        if (updateInterval != null && updateInterval > 0) {
            const time = updateInterval * 1000;
            this.intervalDesc = setInterval (
                () => this.reloadData (), time
            );
        }
    }

    public reloadData (descriptor? : string) : void {
        let request = this.makeRequest (descriptor);
        if (request) {
            request.then (res => {
                this.onRequestFinised (descriptor);
                this.handleResponse (res, descriptor);
            }, (rej : NetworkError) => {
                this.onRequestFinised (descriptor);
                this.handleError (rej, descriptor);
            });
        }
    }

    protected getData () : T { return this.data; }

    protected checkErrorsAndDo <T> (response : ResponseBox <T>, 
            callback : (content : T) => void) : void {
        if (response && !response.error) {
            callback (response.object);
        } else if (response && response.error) {
            let message = response.message ? response.message : "(Message is not available)";
            new ErrorPopupTile (5, "Error occured", message).show ();
        }
    }

    public abstract makeRequest (descriptor? : string) : Promise <ResponseBox <T>>;

    public abstract onRequestFinised (descriptor? : string) : void;

    public abstract handleResponse (response : ResponseBox <T>, descriptor? : string) : void;

    public handleError (error : NetworkError, descriptor? : string) : void {
        if (error instanceof NetworkError && !error.isSystem ()) {
            var comment = error.getComment (), message = error.message;
            var tile = new ErrorPopupTile (5, message, comment);
            tile.show ();
        } else { console.log (error); }
    }

    protected mergeData (receivedData : T, force : boolean) {
        if (this.data == null || force) {
            this.data = receivedData;
        } else if (this.data instanceof Array && receivedData instanceof Array) {
            let array = receivedData as Array <any>;

            let ids = new Set (this.data.map (post => post.postId));
            array = array.filter (post => !ids.has (post.postId));
            this.data.push (...array);
        }
    }

    public destroy (): void {
        if (this.intervalDesc !== null) {
            clearInterval (this.intervalDesc);
        }
    }

}