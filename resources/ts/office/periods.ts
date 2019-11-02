import { DataTable, DTC, DataTableColumn } from "../components/base/data-table-component"
import { PeriodTableComponent } from "../components/periods-table";
import { PeriodEntity } from "../bridge/gen-dtos";
import { PeriodEditorComponent } from "../components/period-editor";
import { element } from "../common";

export let pt : PeriodTableComponent;
export let pe : PeriodEditorComponent;

let newPeriodButton : HTMLButtonElement;

window.onload = function () {
    pe = new PeriodEditorComponent ().init ();
    pt = new PeriodTableComponent ("periods", pe).init ();

    newPeriodButton = element ("new-period-button");
    newPeriodButton.onclick = event => {
        if (event.button) { return; }
        pe.openEditorFor (null);
    };
}