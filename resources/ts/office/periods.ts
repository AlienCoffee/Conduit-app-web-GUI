import { DataTable, DTC, DataTableColumn } from "../components/base/data-table-component"

export let table : DataTable <any>;

window.onload = function () {
    table = new DataTable <any> ("periods-table");
    table.enableSelection ();

    table.setColumnsGenerator (table => {
        let columns : DTC <any> [] = [];
        //columns.push (new DataTableColumn ("category").setTitle ("Cat."));
        columns.push (new DataTableColumn ("name").setTitle ("Name")
            .enableFilter ("name filter"));
        columns.push (new DataTableColumn ("status").setTitle ("Status")
            .enableFilter ().setValue (() => "---"));
        columns.push (new DataTableColumn ("author").setTitle ("Author")
            .enableFilter ().setValue (() => 23).setFormatter (v => "" + (v as number) * 2));
        columns.push (new DataTableColumn ("issued").setTitle ("Issued"));
        columns.push (new DataTableColumn ("priority").setTitle ("")
            .enableEditing ().setValueChangedHandler ((row, value, isr) => value));
        return columns;
    });

    table.setData ([{"name" : "hello"}, {"name" : "second row"}], true);
}