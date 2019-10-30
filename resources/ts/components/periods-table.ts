import { LoadingTableComponent } from "./base/loading-table-component";
import { ResponseBox, PeriodEntity } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";
import { DTC, DataTable, DataTableColumn, StandardFormatter } from "./base/data-table-component";
import { PeriodEditorComponent } from "./period-editor";

export class PeriodTableComponent extends LoadingTableComponent <PeriodEntity> {

    constructor (
        protected componentName  : string,
        protected periodEditor   : PeriodEditorComponent,
        protected updateInterval : number = null
    ) {
        super (componentName, updateInterval);
    }

    public init () : PeriodTableComponent { 
        super.init (); 

        this.table.enableSelection ();
        this.periodEditor.subscribe ("period-table", (period, isNew) => {
            console.log (period);
        });
        this.table.setRowClickHandler (event => {
            this.periodEditor.openEditorFor (event.row);
        });

        return this; 
    }

    public generateColumns (table : DataTable <PeriodEntity>) : DTC <PeriodEntity> [] {
        let columns : DTC <PeriodEntity> [] = [];

        columns.push (new DataTableColumn <PeriodEntity> ("name").setTitle ("Name"));
        columns.push (new DataTableColumn <PeriodEntity> ("status").setTitle ("Status")
            .setValue (row => row.status._name));
        columns.push (new DataTableColumn <PeriodEntity> ("since").setTitle ("Since")
            .setFormatter (StandardFormatter.DATETIME.fun));

        return columns;
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <PeriodEntity []>> {
        return GetController.getPeriods ();
    }    
    
    public handleResponse (response : ResponseBox <PeriodEntity []>, 
            descriptor? : string) : void {
        this.checkErrorsAndDo (response, rows => {
            this.table.setData (rows);
        });
    }

}