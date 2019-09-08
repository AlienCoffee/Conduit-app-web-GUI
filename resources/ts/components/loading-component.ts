import { AbstractComponent } from "./abstract-component";
import { NetworkError } from "../network";
import { PopupTile, ErrorPopupTile } from "../popup";
import { ResponseBox } from "../bridge/gen-dtos";


export abstract class LoadingComponent <T> extends AbstractComponent {

    protected intervalDesc : number = null

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
        } else if (response) {
            // show pop-up
        }
    }

    public abstract makeRequest () : Promise <T>;

    public abstract handleResponse (response : T) : void;

    public destroy (): void {
        if (this.intervalDesc !== null) {
            clearInterval (this.intervalDesc);
        }
    }

}