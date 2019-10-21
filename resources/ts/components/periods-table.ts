import { LoadingTableComponent } from "./base/loading-table-component";
import { ResponseBox, PeriodEntity } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";
import { DTC, DataTable, DataTableColumn } from "./base/data-table-component";

export class PeriodTableComponent extends LoadingTableComponent <PeriodEntity> {

    public init () : PeriodTableComponent { 
        super.init (); 

        this.table.enableSelection ();

        return this; 
    }

    public generateColumns (table : DataTable <PeriodEntity>) : DTC <PeriodEntity> [] {
        let columns : DTC <PeriodEntity> [] = [];

        columns.push (new DataTableColumn <PeriodEntity> ("name").setTitle ("Name"));

        return columns;
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <PeriodEntity []>> {
        return GetController.getPeriods ();
    }    
    
    public handleResponse (response : ResponseBox <PeriodEntity []>, 
            descriptor? : string) : void {
        this.checkErrorsAndDo (response, rows => {
            this.table.setData (rows, true);
        });
    }

}