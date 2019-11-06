import { LoadingComponent } from "./base/loading-component";
import { ResponseBox } from "../bridge/gen-dtos";
import { element } from "../common";
import { OfficeRestController } from "../bridge/gen-apis";

export class OfficePeriodFollower extends LoadingComponent <any> {
    
    protected selector : HTMLSelectElement;

    public init () : OfficePeriodFollower {
        this.selector = element ("office-period-selector");
        this.selector.onchange = 
            event => this.onPeriodSelectionChanged (event);

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