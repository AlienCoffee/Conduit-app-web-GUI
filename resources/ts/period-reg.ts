import { UserProfile } from "./components/base/plofile-component"
import { LoadingComponent } from "./components/base/loading-component";
import { ResponseBox } from "./bridge/gen-dtos";

export let upr : UserPeriodRegistration;
export let up : UserProfile;

window.onload = function () {
    upr = new UserPeriodRegistration ().init ();
    up = new UserProfile ().init ();
}

export class UserPeriodRegistration extends LoadingComponent <any> {
    
    public init () : UserPeriodRegistration { return this; }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <any>> {
        return null;
    }

    public onRequestFinised (descriptor? : string) : void {
        //
    }

    public handleResponse (response : ResponseBox <any>, descriptor? : string) : void {
        //
    }

}