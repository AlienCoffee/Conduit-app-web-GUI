import { AbstractComponent } from "./abstract-component";
import { NetworkError } from "../network";
import { PopupTile, ErrorPopupTile } from "../popup";
import { ResponseBox } from "../bridge/gen-dtos";

export abstract class LoadingComponent <T> extends AbstractComponent {

    protected intervalDesc : NodeJS.Timeout = null

    protected data : T;

    constructor (
        /**
         * Update interval in seconds
         */
        protected updateInterval : number = null,
        protected spinner        : HTMLDivElement = null
    ) {
        super ();

        if (updateInterval != null && updateInterval > 0) {
            const time = updateInterval * 1000;
            this.intervalDesc = setInterval (
                () => this.reloadData (), time
            );
        }
    }

    public reloadData () {
        if (this.spinner) { $(this.spinner).show (); }
        this.makeRequest ().then (res => {
            if (this.spinner) { $(this.spinner).hide (); }
            this.handleResponse (res);
        }).catch ((rej : NetworkError) => {
            if (this.spinner) { $(this.spinner).hide (); }
            console.log (rej);

            if (!rej.isSystem ()) {
                var comment = rej.getComment (), message = rej.message;
                var tile = new ErrorPopupTile (10, message, comment);
                tile.show ();
            } else { console.log (rej); }
        });
    }

    protected checkErrorsAndDo <CT> (response : ResponseBox <CT>, 
            callback : (content : CT) => void) {
        if (response && !response.error) {
            callback (response.object);
        } else if (response && response.error) {
            let message = response.message ? response.message 
                        : "(Message is not available)";
            new ErrorPopupTile (5, "Error occured", message)
              . show ();
        }
    }

    public abstract makeRequest () : Promise <ResponseBox <T>>;

    public abstract handleResponse (response : ResponseBox <T>) : void;

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