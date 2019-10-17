import { LoadingComponent } from "./loading-component";
import { AbstractComponent } from "./abstract-component";
import { element } from "../../common";
import { DataTable } from "./data-table-component";

export abstract class LoadingTableComponent <T> extends LoadingComponent <T> {

    protected spinner : HTMLDivElement;

    protected table : DataTable <T>;

    constructor (
        protected componentName  : string,
        protected updateInterval : number = null,
    ) {
        super (updateInterval);
    }

    public init () : AbstractComponent {
        this.spinner = element (this.componentName + "-table-spinner");
        this.table = new DataTable (this.componentName + "-table");
        return this;
    }

    public reloadData (descriptor? : string) {
        if (this.spinner) { $(this.spinner).show (); }
        super.reloadData (descriptor);
    }

    public onRequestFinised (descriptor? : string) : void {
        if (this.spinner) { $(this.spinner).hide (); }
    }

}