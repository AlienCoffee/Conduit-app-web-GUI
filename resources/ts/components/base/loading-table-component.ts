import { LoadingComponent } from "./loading-component";
import { AbstractComponent } from "./abstract-component";
import { element } from "../../common";
import { DataTable, DTC } from "./data-table-component";

export abstract class LoadingTableComponent <T> extends LoadingComponent <T []> {

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
        this.table.setColumnsGenerator (table => this.generateColumns (table));
        this.reloadData ();
        
        return this;
    }

    public abstract generateColumns (table : DataTable <T>) : DTC <T> [];

    public reloadData (descriptor? : string) {
        if (this.spinner) { $(this.spinner).show (); }
        super.reloadData (descriptor);
    }

    public onRequestFinised (descriptor? : string) : void {
        if (this.spinner) { $(this.spinner).hide (); }
    }

}