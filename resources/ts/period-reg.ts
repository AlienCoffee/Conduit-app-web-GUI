import { UserProfile } from "./components/base/plofile-component"
import { LoadingComponent } from "./components/base/loading-component";
import { ResponseBox, WebFormRow } from "./bridge/gen-dtos";
import { GetController, CreateController } from "./bridge/gen-apis";
import { inputElement, element, clearChildren, Pair } from "./common";
import { makeWebFormTitleElement, makeWebFormFieldElement, makeWebFormSelectElement, makeWebFormAgreeElement } from "./bridge/gen-htmls";
import { Enum, EnumType } from "../lib/jenum";

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

    protected formData : Map <string, string> = new Map ();
    protected roles : Map <string, WebFormRow []>;

    public init () : UserPeriodRegistration { 
        this.periodId = +inputElement ("period-id").value;
        this.userId = +inputElement ("user-id").value;

        this.spinner = element ("reg-spinner");
        if (this.spinner) { $(this.spinner).hide (); }

        this.regRoleSelec = element ("reg-role-select");
        this.regRoleSelec.onchange = () => this.generateForm ();

        this.regFormRole = element ("reg-form-role");
        this.regTitle = element ("reg-title");
        $(this.regTitle).hide ();
        this.regTitle.classList.remove ("hidden");
        this.regForm = element ("reg-form");
        $(this.regForm).hide ();
        this.regForm.classList.remove ("hidden");

        this.reloadData (RegFormRequest.PERSONAL_DATA.value);
        this.reloadData (RegFormRequest.ROLES.value);
        return this; 
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <any>> {
        if (this.spinner) { $(this.spinner).show (); }

        if (descriptor == RegFormRequest.ROLES.value) {
            return GetController.getPeriodRegisterRoles ();
        } else if (descriptor == RegFormRequest.PERSONAL_DATA.value) {
            return GetController.getPersonalData (this.periodId, this.userId);
        } else if (descriptor == RegFormRequest.REGISTER.value) {
            let template = this.regRoleSelec.value;
            return CreateController.createPeriodRegistration (template, 
                this.periodId, this.formData);
        }

        return null;
    }

    public onRequestFinised (descriptor? : string) : void {
        if (this.spinner) { $(this.spinner).hide (); }
    }

    public handleResponse (response : ResponseBox <any>, descriptor? : string) : void {
        this.checkErrorsAndDo (response, res => {
            if (descriptor == RegFormRequest.ROLES.value) {
                this.roles = res as Map <string, WebFormRow []>;
                this.updateRolesSelection ();
            } else if (descriptor == RegFormRequest.PERSONAL_DATA.value) {
                let obj = res as Map <string, Object>;
            } else if (descriptor == RegFormRequest.REGISTER.value) {

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

    private regFormButtonName = "reg-form-button";
    private agreeCheckboxName = "regAgreement";

    private generateForm () : void {
        let role = this.regRoleSelec.value;
        this.formData.clear ();

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

        let agreeRow = makeWebFormAgreeElement (this.agreeCheckboxName);
        this.regForm.appendChild (agreeRow);

        let registerRow = document.createElement ("div");
        registerRow.classList.add ("container", "d-flex", 
            "justify-content-end", "mt-3");
        this.regForm.appendChild (registerRow);

        let registerButton = document.createElement ("button");
        registerButton.classList.add ("btn", "btn-sm", "btn-primary");
        registerButton.setAttribute ("data-placement", "bottom");
        registerButton.setAttribute ("data-toggle", "tooltip");
        registerButton.id = this.regFormButtonName;
        registerButton.innerHTML = "Register";
        ($(registerButton) as any).tooltip ();
        registerButton.onclick = event => {
            this.reloadData (RegFormRequest.REGISTER.value);
            event.preventDefault ();
        };
        registerRow.appendChild (registerButton);

        let className = "web-form-element";
        for (let elem of this.regForm.getElementsByClassName (className)) {
            let telem = elem as HTMLInputElement;

            telem.onchange = () => this.updateForm ();
            telem.onkeyup = () => this.updateForm ();
        }

        $(this.regTitle).show ();
        $(this.regForm).show ();
        this.updateForm ();
    }

    private updateForm () : void {
        let registerButton = document.getElementById (this.regFormButtonName);
        registerButton.setAttribute ("disabled", "");

        let role = this.regRoleSelec.value;
        this.formData.clear ();

        let className = "web-form-element";
        let agreed = false;

        for (let elem of this.regForm.getElementsByClassName (className)) {
            let telem = elem as HTMLInputElement; // typed element

            if (telem.name == this.agreeCheckboxName) {
                agreed = telem.checked;
            } else if (telem.value && telem.value.length > 0) {
                this.formData.set (telem.name, telem.value);
            }
        }

        if (agreed) {
            let enable = true;
            this.roles.get (role).forEach (row => {
                if (row.required) {
                    if (enable && !this.formData.has (row.id)) {
                        registerButton.title = "Missed value of required field: " 
                                             + row.title;
                        enable = false;
                    }
                }
            });

            if (enable) {
                registerButton.removeAttribute ("disabled");
                registerButton.title = "";
            }
        } else {
            registerButton.title = "You have to accept our conditions";
        }
    }

}

@Enum <RegFormRequest> ("value")
class RegFormRequest extends EnumType <RegFormRequest> () {
    
    static readonly PERSONAL_DATA = new RegFormRequest ("personal-data");
    static readonly REGISTER      = new RegFormRequest ("register"); 
    static readonly ROLES         = new RegFormRequest ("roles");

    private constructor (readonly value : string) { super (); }

} 