import { element, clearChildren } from "../../common";

// Columns generator function type
type CGFT <T> = (table : DataTable <T>) => DTC <T> [];

// Cell click handler type
type CCHT <T> = (event : CCE <T>) => boolean;

export class DataTable <T> {
    
    protected baseDiv : HTMLDivElement;

    protected headersTag : HTMLTableSectionElement;
    protected bodyTag : HTMLTableSectionElement;
    
    protected cellEditEnableButton : HTMLButtonElement;
    protected filterEnableButton : HTMLButtonElement;
    protected filtersRow : HTMLTableRowElement;

    protected columnsGenerator : CGFT <T>;
    protected columns : DTC <T> [];
    protected data : T [];

    protected rowSelectionEnabled = false;
    protected rowFilteringEnabled = false;
    protected cellEditingEnabled = false;

    protected editor : TableEditorState <T>;

    constructor (
        protected htmlID : string
    ) {
        this.baseDiv = element (htmlID);
        if (!this.baseDiv) {
            throw new Error ("Failed to find table main DIV block");
        }

        this.editor = new TableEditorState (this);
        clearChildren (this.baseDiv);

        let table = document.createElement ("table");
        table.classList.add ("table", "table-sm");
        this.baseDiv.appendChild (table);

        this.headersTag = document.createElement ("thead");
        table.appendChild (this.headersTag);

        this.bodyTag = document.createElement ("tbody");
        table.appendChild (this.bodyTag);

        let settings = document.createElement ("div");
        settings.classList.add ("d-flex", "flex-column", "ml-2");
        this.baseDiv.appendChild (settings);

        this.filterEnableButton = document.createElement ("button");
        this.filterEnableButton.innerHTML = 
            "<i class=\"fas fa-filter\" aria-hidden=\"true\"></i>";
        this.filterEnableButton.classList.add ("btn", "btn-sm", "mb-2");
        settings.appendChild (this.filterEnableButton);

        this.filterEnableButton.onclick = event => {
            event.preventDefault ();

            this.rowFilteringEnabled = !this.rowFilteringEnabled;
            this.toggleFilters ();
        };

        let sortButton = document.createElement ("button");
        sortButton.innerHTML = "<i class=\"fas fa-sort\" aria-hidden=\"true\"></i>";
        sortButton.classList.add ("btn", "btn-sm", "mb-2");
        settings.appendChild (sortButton);

        this.cellEditEnableButton = document.createElement ("button");
        this.cellEditEnableButton.innerHTML = 
            "<i class=\"fas fa-pen\" aria-hidden=\"true\"></i>";
        this.cellEditEnableButton.classList.add ("btn", "btn-sm", "mb-2");
        settings.appendChild (this.cellEditEnableButton);

        this.cellEditEnableButton.onclick = event => {
            event.preventDefault ();

            this.cellEditingEnabled = !this.cellEditingEnabled;
            if (this.cellEditingEnabled) {
                this.cellEditEnableButton.classList.add ("btn-secondary");
            } else {
                this.cellEditEnableButton.classList.remove ("btn-secondary");
                this.editor.changeFocus (null, null, null, null);
            }
        };
    }

    public setColumnsGenerator (generator : CGFT <T>) : DataTable <T> {
        this.columnsGenerator = generator;
        return this;
    }

    public setData (data : T [], generateColumns : boolean = false) : DataTable <T> {
        this.data = data;

        if (generateColumns && this.columnsGenerator) {
            this.columns = this.columnsGenerator (this);
        }

        this.refreshTable ();
        return this;
    }

    public enableSelection () : DataTable <T> {
        this.rowSelectionEnabled = true;
        return this;
    }

    public refreshTable () {
        clearChildren (this.headersTag);
        clearChildren (this.bodyTag);

        // header part

        let titles = document.createElement ("tr");
        this.headersTag.appendChild (titles);

        this.filtersRow = document.createElement ("tr");
        this.headersTag.appendChild (this.filtersRow);
        this.toggleFilters ();

        if (this.rowSelectionEnabled) {
            let thH = document.createElement ("th");
            titles.appendChild (thH);

            let thF = document.createElement ("th");
            this.filtersRow.appendChild (thF);
        }

        for (let column of (this.columns ? this.columns : [])) {
            let thH = document.createElement ("th");
            thH.innerHTML = column.getTitle ();
            titles.appendChild (thH);

            let thF = document.createElement ("th");
            this.filtersRow.appendChild (thF);
            if (column.isFilterEnabled ()) {
                let input = document.createElement ("input");
                input.classList.add ("form-control-plaintext", 
                    "form-control-sm", "px-1");
                input.placeholder = column.getPlaceholder ();
                thF.appendChild (input);
            }
        }

        // body part

        for (const row of (this.data ? this.data : [])) {
            const tr = document.createElement ("tr");
            this.bodyTag.appendChild (tr);

            if (this.rowSelectionEnabled) {
                const td = document.createElement ("td");
                tr.appendChild (td);

                let checkbox = document.createElement ("input");
                checkbox.type = "checkbox";
                td.appendChild (checkbox);
            }

            for (const column of (this.columns ? this.columns : [])) {
                const td = document.createElement ("td");
                td.onclick = event => this.cellClicked (event, row, column);
                tr.appendChild (td);

                if (column.isEditingEnabled (row)) {
                    td.classList.add ("p-relative");

                    let value = document.createElement ("span");
                    value.innerHTML = column.getValue (row);
                    td.appendChild (value);

                    let input = document.createElement ("input");
                    input.classList.add ("form-control-plaintext", "form-control-sm", 
                        "p-absolute", "t-0", "l-0", "px-1");
                    //input.placeholder = "...";
                    td.appendChild (input);
                    $(input).hide ();
                } else {
                    td.innerHTML = column.getValue (row);
                }
            }
        }
    }

    private toggleFilters () {
        if (this.rowFilteringEnabled) {
            this.filterEnableButton.classList.add ("btn-secondary");
            $(this.filtersRow).show ();
        } else {
            this.filterEnableButton.classList.remove ("btn-secondary");
            $(this.filtersRow).hide ();
        }
    }

    private rowClicked (event : MouseEvent, row : T) {
        let wrapper = new RowClickEvent (event, row);
        console.log (wrapper);
    }

    private cellClicked (event : MouseEvent, row : T, column : DTC <T>) {
        let wrapper = new CellClickEvent (event, row, column);
        this.editor.changeFocus (null, null, row, column);
        let handler = column.getClickHandler ();

        if (this.cellEditingEnabled && column.isEditingEnabled (row)) {
            let cell = wrapper.getTarget ();
            while (cell && cell.tagName.toLowerCase () != "td") {
                cell = cell.parentElement;
            }

            if (!cell) { // nothing to do when no element
                return;
            }

            let input = cell.getElementsByTagName ("input") [0];
            let value = cell.getElementsByTagName ("span") [0];

            this.editor.changeFocus (value, input, row, column);
        } else if (handler && handler (wrapper)) {
            // event consumed and nothig will happen here
        } else { // no handlers for cell event -> go to level up
            this.rowClicked (event, row);
        }
    }

}

export type DTC <T> = DataTableColumn <T>;

export class DataTableColumn <T> {

    protected _columnId : string;

    constructor (
        columnId : string
    ) {
        this._columnId = columnId;
    }

    getColumnId () : string {
        return this._columnId;
    }

    protected _title : string;

    setTitle (title : string) : DTC <T> {
        this._title = title;
        return this;
    }

    getTitle () : string {
        return this._title;
    }

    protected _placeholder : string = null;
    protected _filterEnabled = false;

    enableFilter (placeholder? : string) : DTC <T> {
        if (placeholder) {
            this._placeholder = placeholder;
        }

        this._filterEnabled = true;
        return this;
    }

    isFilterEnabled () : boolean {
        return this._filterEnabled;
    }

    getPlaceholder () : string {
        if (!this._placeholder) {
            return this._columnId + " filter";
        }
        return this._placeholder;
    }

    protected _valueFormatter : (value : string | number) => string;

    setFormatter (formatter : (value : string | number) => string) : DTC <T> {
        this._valueFormatter = formatter;
        return this;
    }

    protected _valueRetriever : (row : T) => string | number;

    setValue (value : (row : T) => string | number) : DTC <T> {
        this._valueRetriever = value;
        return this;
    }

    getValue (row : T, locale? : string) : string {
        let value = this._valueRetriever ? this._valueRetriever (row) 
                  : (row [this.getColumnId ()] as string | number);
        return this._valueFormatter ? this._valueFormatter (value) 
             : "" + value;
    }

    protected _editingEnabled : (row : T) => boolean = () => false;

    enableEditing (criteria? : (row : T) => boolean) : DTC <T> {
        this._editingEnabled = criteria ? criteria : () => true;
        return this;
    }

    isEditingEnabled (row : T) : boolean {
        return this._editingEnabled (row);
    }

    protected _cellValueChangedHandler : 
        (row : T, value : string, isReseted : boolean) => string 
        = (row, value, isr) => this.getValue (row);

    setValueChangedHandler (
        handler : (row : T, value : string, isReseted : boolean) => string
    ) : DTC <T> {
        this._cellValueChangedHandler = handler ? handler 
            : (row, value, isr) => this.getValue (row);
        return this;
    }

    getValueChangedHandler () : (row : T, value : string, isReseted : boolean) => string {
        return this._cellValueChangedHandler;
    }

    protected _cellClickHandler : CCHT <T>;

    setClickHandler (handler : CCHT <T>) : DTC <T> {
        this._cellClickHandler = handler;
        return this;
    }

    getClickHandler () : CCHT <T> {
        return this._cellClickHandler;
    }

}

export class TableEditorState <T> {

    protected _input : HTMLInputElement;
    protected _value : HTMLSpanElement;

    protected _column : DTC <T>;
    protected _row : T;

    protected _isActive : boolean = false;

    constructor (
        protected table : DataTable <T>
    ) {}

    public changeFocus (value : HTMLSpanElement, input : HTMLInputElement,
            row : T, column : DTC <T>) {        
        if (this._value || this._input) {
            this.resetCurrentState ();
        }

        if (!value || !input) { return; }

        this._column = column;
        this._value = value;
        this._input = input;
        this._row = row;
        this.activateCurrentState ();
    }

    private activateCurrentState () : void {
        this._input.value = this._value.innerHTML;
        $(this._input).show ();
        this._input.focus ();

        $(this._value).hide ();
        this._isActive = true;

        const editor : TableEditorState <T> = this;
        this._input.onchange = function (event) {
            editor.resetCurrentState (false);
        }
    }

    private resetCurrentState (isReset : boolean = true) : void {
        if (!this._isActive) { return; } // cell is disabled
        let handler = this._column.getValueChangedHandler ();
        this._isActive = false;

        let value = this._input.value;
        this._value.innerHTML = handler (this._row, value, isReset);
        this._input.value = null;

        $(this._value).show ();
        $(this._input).hide ();
    }

}

export type RCE <T> = RowClickEvent <T>;

export class RowClickEvent <T> {

    constructor (
        protected event : MouseEvent,
        public readonly row : T
    ) {}

    public getTarget <T extends HTMLElement> () : T {
        return this.event.target as T;
    }

}

export type CCE <T> = CellClickEvent <T>;

export class CellClickEvent <T> extends RowClickEvent <T> {

    constructor (
        event : MouseEvent,
        row : T,
        public readonly column : DTC <T>
    ) {
        super (event, row);
    }

}