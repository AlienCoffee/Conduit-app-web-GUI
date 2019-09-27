import { LoadingComponent } from "./loading-component";
import { element } from "../../common";

export abstract class LoadingWallComponent <T> extends LoadingComponent <T> {

    protected nonthingDiv : HTMLDivElement;
    protected spinner : HTMLDivElement;
    protected wall : HTMLElement;

    constructor (
        protected componentName  : string,
        protected updateInterval : number = null,
    ) {
        super ();
    }

    public init () : LoadingWallComponent <T> {
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