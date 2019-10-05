import { element, clearChildren } from "../../common";

// Columns generator function type
type CGFT <T> = (table : DataTable <T>) => DTC <T> [];

export class DataTable <T> {
    
    protected baseDiv : HTMLDivElement;

    protected headersTag : HTMLTableSectionElement;
    protected bodyTag : HTMLTableSectionElement;
    
    protected filterEnableButton : HTMLButtonElement;
    protected filtersRow : HTMLTableRowElement;

    protected columnsGenerator : CGFT <T>;
    protected columns : DTC <T> [];
    protected data : T [];

    protected rowSelectionEnabled = false;
    protected rowFilteringEnabled = false;

    constructor (
        protected htmlID : string
    ) {
        this.baseDiv = element (htmlID);
        if (!this.baseDiv) {
            throw new Error ("Failed to find table main DIV block");
        }

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
                input.classList.add ("form-control-plaintext", "form-control-sm");
                input.placeholder = column.getPlaceholder ();
                thF.appendChild (input);
            }
        }

        // body part

        for (let row of (this.data ? this.data : [])) {
            let tr = document.createElement ("tr");
            this.bodyTag.appendChild (tr);

            if (this.rowSelectionEnabled) {
                let td = document.createElement ("td");
                tr.appendChild (td);

                let checkbox = document.createElement ("input");
                checkbox.type = "checkbox";
                td.appendChild (checkbox);
            }

            for (let column of (this.columns ? this.columns : [])) {
                let td = document.createElement ("td");
                tr.appendChild (td);

                td.innerHTML = column.getValue (row);
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

}