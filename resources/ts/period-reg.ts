import { UserProfile } from "./components/base/plofile-component"
import { LoadingComponent } from "./components/base/loading-component";
import { ResponseBox, WebFormRow } from "./bridge/gen-dtos";
import { GetController } from "./bridge/gen-apis";
import { inputElement, element } from "./common";

export let upr : UserPeriodRegistration;
export let up : UserProfile;

window.onload = function () {
    upr = new UserPeriodRegistration ().init ();
    up = new UserProfile ().init ();
}

export class UserPeriodRegistration extends LoadingComponent <any> {
    
    protected regTitle : HTMLHeadingElement;
    protected regFormRole : HTMLElement;
    protected regForm : HTMLFormElement;
    protected spinner : HTMLDivElement;

    protected periodId : number;
    protected userId : number;

    public init () : UserPeriodRegistration { 
        this.periodId = +inputElement ("period-id").value;
        this.userId = +inputElement ("user-id").value;

        this.spinner = element ("reg-spinner");
        if (this.spinner) { $(this.spinner).hide (); }

        this.regFormRole = element ("reg-form-role");
        this.regTitle = element ("reg-title");
        $(this.regTitle).hide ();
        this.regTitle.classList.remove ("hidden");
        this.regForm = element ("reg-form");
        $(this.regForm).hide ();
        this.regForm.classList.remove ("hidden");

        this.reloadData ("personal-data");
        this.reloadData ("roles");
        return this; 
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <any>> {
        if (this.spinner) { $(this.spinner).show (); }

        if (descriptor == "roles") {
            return GetController.getPeriodRegisterRoles ();
        } else if (descriptor == "personal-data") {
            return GetController.getPersonalData (this.periodId, this.userId);
        }

        return null;
    }

    public onRequestFinised (descriptor? : string) : void {
        if (this.spinner) { $(this.spinner).hide (); }
    }

    public handleResponse (response : ResponseBox <any>, descriptor? : string) : void {
        this.checkErrorsAndDo (response, res => {
            if (descriptor == "roles") {
                let obj = res as Map <string, WebFormRow []>;
                console.log (obj);
            } else if (descriptor == "personal-data") {
                let obj = res as Map <string, Object>;
                console.log (obj);
            }
        });
    }

}