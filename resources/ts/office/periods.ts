import { DataTable, DTC, DataTableColumn } from "../components/base/data-table-component"
import { PeriodTableComponent } from "../components/periods-table";
import { PeriodEntity } from "../bridge/gen-dtos";

export let pt : PeriodTableComponent;
export let table : DataTable <any>;

window.onload = function () {
    pt = new PeriodTableComponent ("periods").init ();

    /*
    table = new DataTable <any> ("periods-table");
    table.enableSelection ();

    table.setColumnsGenerator (table => {
        let columns : DTC <any> [] = [];
        //columns.push (new DataTableColumn ("category").setTitle ("Cat."));
        columns.push (new DataTableColumn ("name").setTitle ("Name")
            .enableFilter ("name filter").enableSorting ());
        columns.push (new DataTableColumn ("status").setTitle ("Status")
            .enableFilter ().setValue (() => "---"));
        columns.push (new DataTableColumn ("author").setTitle ("Author")
            .enableFilter ().setValue (() => 23).setFormatter (v => "" + (v as number) * 2));
        columns.push (new DataTableColumn ("issued").setTitle ("Issued"));
        columns.push (new DataTableColumn ("priority").setTitle ("")
            .enableEditing ().setValueChangedHandler ((row, value, isr) => {
                row ["priority"] = value;
                return value;
            }));
        return columns;
    });

    table.setData ([{"name" : "hello"}, {"name" : "second row"}, 
        {"name" : "third row"}, {"name" : "fourth row"}], true);
    */
}