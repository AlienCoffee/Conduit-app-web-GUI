import { LoadingComponent } from "./loading-component";
import { element } from "../../common";

export abstract class LoadingWallComponent <T> extends LoadingComponent <T> {

    protected updateButton : HTMLButtonElement; 
    protected nonthingDiv : HTMLDivElement;
    protected spinner : HTMLDivElement;
    protected wall : HTMLElement;

    constructor (
        protected componentName  : string,
        protected updateInterval : number = null,
    ) {
        super (updateInterval);
    }

    public init () : LoadingWallComponent <T> {
        this.updateButton = element (this.componentName + "-wall-update");
        if (this.updateButton) {
            this.updateButton.onclick = () => {
                this.updateButton.setAttribute ("disabled", "");
                setTimeout (() => { // to prevent too frequent updates
                    this.updateButton.removeAttribute ("disabled");
                }, 1000);

                this.reloadData ()
            };
        }

        this.nonthingDiv = element (this.componentName + "-wall-nothing");
        this.spinner = element (this.componentName + "-wall-spinner");
        this.wall = element (this.componentName + "-wall");
        this.reloadData ();

        return this;
    }

    public reloadData (descriptor? : string) {
        if (this.spinner) { $(this.spinner).show (); }
        super.reloadData (descriptor);
    }

    public onRequestFinised () : void {
        if (this.spinner) { $(this.spinner).hide (); }
    }

}