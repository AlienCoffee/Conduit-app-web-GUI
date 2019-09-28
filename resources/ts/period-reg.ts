import { UserProfile } from "./components/base/plofile-component"
import { LoadingComponent } from "./components/base/loading-component";
import { ResponseBox, WebFormRow } from "./bridge/gen-dtos";
import { GetController } from "./bridge/gen-apis";
import { inputElement, element, clearChildren, Pair } from "./common";
import { makeWebFormTitleElement, makeWebFormFieldElement, makeWebFormSelectElement, makeWebFormAgreeElement } from "./bridge/gen-htmls";

export let upr : UserPeriodRegistration;
export let up : UserProfile;

window.onload = function () {
    upr = new UserPeriodRegistration ().init ();
    up = new UserProfile ().init ();
}

export class UserPeriodRegistration extends LoadingComponent <any> {
    
    protected regRoleSelec : HTMLSelectElement;
    protected regTitle : HTMLHeadingElement;
    protected regFormRole : HTMLElement;
    protected regForm : HTMLFormElement;
    protected spinner : HTMLDivElement;

    protected periodId : number;
    protected userId : number;

    protected roles : Map <string, WebFormRow []>;

    public init () : UserPeriodRegistration { 
        this.periodId = +inputElement ("period-id").value;
        this.userId = +inputElement ("user-id").value;

        this.spinner = element ("reg-spinner");
        if (this.spinner) { $(this.spinner).hide (); }

        this.regRoleSelec = element ("reg-role-select");
        this.regRoleSelec.onchange = () => this.updateForm ();

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
                this.roles = res as Map <string, WebFormRow []>;
                this.updateRolesSelection ();
            } else if (descriptor == "personal-data") {
                let obj = res as Map <string, Object>;
                console.log (obj);
            }
        });
    }

    private updateRolesSelection () {
        let fakeOption = document.createElement ("option");
        fakeOption.innerHTML = "(not selected)";
        fakeOption.value = null;
        this.regRoleSelec.appendChild (fakeOption);

        Array.from (this.roles.keys()).sort ().forEach (key => {
            let option = document.createElement ("option");
            option.innerHTML = key;
            option.value = key;

            this.regRoleSelec.appendChild (option);
        });
    }

    private updateForm () : void {
        let role = this.regRoleSelec.value;
        if (role == "null") {
            $(this.regTitle).hide ();
            $(this.regForm).hide ();
            return;
        } 

        this.regFormRole.innerHTML = role;
        clearChildren (this.regForm);

        let container : HTMLDivElement = null;
        for (let row of this.roles.get (role)) {
            if (container && row.rowType != "field" && row.rowType != "select") {
                this.regForm.appendChild (container);
                container = null;
            }

            if (row.rowType == "field") {
                if (!container) {
                    container = document.createElement ("div");
                    container.classList.add ("container");
                }

                let type = row.fieldType.name.toLowerCase ();
                let comment = row.comment != "null" ? row.comment : "";
                let elem = makeWebFormFieldElement (row.title, type, row.id, comment);
                container.appendChild (elem);
            } else if (row.rowType == "title") {
                let icon = row.icon != "null" ? row.icon : "";
                let elem = makeWebFormTitleElement (icon, row.title);
                this.regForm.appendChild (elem);
            } else if (row.rowType == "select") {
                if (!container) {
                    container = document.createElement ("div");
                    container.classList.add ("container");
                }

                let comment = row.comment != "null" ? row.comment : "";
                let options = row.options.map ((option : Pair <string, string>) => {
                    return "<option value=" + option.S + ">" + option.F + "</option>";
                }).join ();
                let elem = makeWebFormSelectElement (row.title, row.id, options, comment);
                container.appendChild (elem);
            }
        }

        if (container) {
            this.regForm.appendChild (container);
        }

        let agreeTitle = makeWebFormTitleElement ("fas fa-handshake", "Almost done");
        this.regForm.appendChild (agreeTitle);

        let agreeRow = makeWebFormAgreeElement ();
        this.regForm.appendChild (agreeRow);

        let registerRow = document.createElement ("div");
        registerRow.classList.add ("container", "d-flex", 
            "justify-content-end", "mt-3");
        this.regForm.appendChild (registerRow);

        let registerButton = document.createElement ("button");
        registerButton.classList.add ("btn", "btn-sm", "btn-primary");
        registerButton.innerHTML = "Register";
        registerRow.appendChild (registerButton);

        $(this.regTitle).show ();
        $(this.regForm).show ();
    }

}