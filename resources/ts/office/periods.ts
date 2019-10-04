import { DataTable, DTC, DataTableColumn } from "../components/base/data-table-component"

export let table : DataTable <any>;

window.onload = function () {
    table = new DataTable <any> ("periods-table");
    table.enableSelection ();

    table.setColumnsGenerator (table => {
        let columns : DTC [] = [];
        //columns.push (new DataTableColumn ("category").setTitle ("Cat."));
        columns.push (new DataTableColumn ("name").setTitle ("Name")
            .enableFilter ("name filter"));
        columns.push (new DataTableColumn ("status").setTitle ("Status"));
        columns.push (new DataTableColumn ("author").setTitle ("Author"));
        columns.push (new DataTableColumn ("issued").setTitle ("Issued"));
        columns.push (new DataTableColumn ("priority").setTitle (""));
        return columns;
    });

    table.setData ([], true);
}