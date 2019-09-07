import { AbstractComponent } from "./abstract-component";


export abstract class LoadingComponent <T> extends AbstractComponent {

    protected intervalDesc : number = null

    constructor (
        /**
         * Update interval in seconds
         */
        protected updateInterval : number = 1
    ) {
        super ();

        this.intervalDesc = setInterval (() => {}, 1000);
    }

    public reloadData () {

    }

    protected onLoadingFinished (responce : T) : void {
        
    }

    public abstract interpretateResponse (response : T) : void;

    public destroy (): void {
        if (this.intervalDesc !== null) {
            clearInterval (this.intervalDesc);
        }
    }

}