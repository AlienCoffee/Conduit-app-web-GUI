import { LoadingTableComponent } from "./base/loading-table-component";
import { ResponseBox, PeriodEntity } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";

export class PeriodTableComponent extends LoadingTableComponent <PeriodEntity []> {

    public init () : PeriodTableComponent { super.init (); return this; }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <PeriodEntity []>> {
        return GetController.getPeriods ();
    }    
    
    public handleResponse (response : ResponseBox <PeriodEntity []>, 
            descriptor? : string) : void {
        //
    }

}