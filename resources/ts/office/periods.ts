import { DataTable, DTC, DataTableColumn } from "../components/base/data-table-component"
import { PeriodTableComponent } from "../components/periods-table";
import { PeriodEntity } from "../bridge/gen-dtos";
import { PeriodEditorComponent } from "../components/period-editor";
import { element } from "../common";
import { OfficePeriodFollower } from "../components/office-period-follower";

export let pt : PeriodTableComponent;
export let pe : PeriodEditorComponent;
export let off : OfficePeriodFollower;

let newPeriodButton : HTMLButtonElement;

window.onload = function () {
    pe = new PeriodEditorComponent ().init ();
    pt = new PeriodTableComponent ("periods", pe).init ();
    off = new OfficePeriodFollower ().init ();

    newPeriodButton = element ("new-period-button");
    newPeriodButton.onclick = event => {
        if (event.button) { return; }
        pe.openEditorFor (null);
    };
}