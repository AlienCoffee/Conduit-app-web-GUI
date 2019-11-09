import { LoadingComponent } from "./base/loading-component";
import { ResponseBox } from "../bridge/gen-dtos";
import { element } from "../common";
import { OfficeRestController } from "../bridge/gen-apis";
import { PeriodEditorComponent } from "./period-editor";

export class OfficePeriodFollower extends LoadingComponent <any> {
    
    protected selector : HTMLSelectElement;

    constructor (
        private periodEditor : PeriodEditorComponent = null
    ) {
        super ();
    }

    public init () : OfficePeriodFollower {
        this.selector = element ("office-period-selector");
        this.selector.onchange = 
            event => this.onPeriodSelectionChanged (event);

        if (this.periodEditor) {
            this.periodEditor.subscribe ("period-follower", (period, isNew) => {
                
            });
        }

        return this;
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <any>> {
        return OfficeRestController.periodSelection (+this.selector.value);
    }    
    
    public onRequestFinised (descriptor? : string) : void {
        //
    }
    
    public handleResponse (response : ResponseBox <any>, descriptor? : string) : void {
        this.checkErrorsAndDo (response, () => { location.reload (); });
    }

    private onPeriodSelectionChanged (event : Event) {
        this.reloadData ();
    }

}