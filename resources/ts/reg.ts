import { AbstractComponent } from "./components/abstract-component";
import { element, inputElement } from "./common";
import { CreateController } from "./bridge/gen-apis";
import { catchErrorWithSpinner, NetworkError } from "./network";
import { LoadingComponent } from "./components/loading-component";
import { ResponseBox } from "./bridge/gen-dtos";
import { Enum, Enumerable } from "../lib/jenum";

//
// (c) Shemplo
//

export let ur : UserRegistration;

window.onload = function () {
    ur = new UserRegistration ();
}

export class UserRegistration extends LoadingComponent <void> {

    private regButtonNotice : HTMLSpanElement;
    private regButton  : HTMLButtonElement;

    private regSecretContainer : HTMLDivElement;
    private regPasswordRandom : HTMLButtonElement;
    private regPasswordView : HTMLButtonElement;
    private isPasswordHide : boolean = true;
    
    private regPassword  : HTMLInputElement;
    private regSecret    : HTMLInputElement;
    private regLogin     : HTMLInputElement;
    private regPhone     : HTMLInputElement;

    private verificationAttempt = 0;
    private state : UserRegState;

    public init (): void {
        this.state = UserRegState.FIELDS_FILLING;

        this.regButtonNotice = element ("reg-button-notice");
        this.regButton = element ("reg-button");
        this.regButton.onclick = event => {
            event.preventDefault     ();
            this.performRegistration ();
        };
        
        this.regPassword = inputElement ("reg-password");
        this.regSecret = inputElement ("reg-secret");
        this.regLogin = inputElement ("reg-login");
        this.regPhone = inputElement ("reg-phone");

        [this.regPassword, this.regLogin, this.regPhone].forEach (elem => {
            elem.onchange = event => this.updateForm ();
            elem.onkeyup = event => this.updateForm ();
        });
        
        this.spinner = element ("reg-spinner");
        if (this.spinner) { $(this.spinner).hide (); }
        
        this.regPasswordRandom = element ("reg-password-random");
        this.regPasswordRandom.onclick = event => {
            event.preventDefault        ();
            this.fillWithRandomPassword ();
        };

        this.regPasswordView = element ("reg-password-view");
        this.regPasswordView.onclick = event => {
            event.preventDefault    ();
            this.togglePasswordView ();
        };

        this.regSecretContainer = element ("reg-secret-container");
        $(this.regSecretContainer).hide ();
        this.regSecretContainer.classList.remove ("d-none");

        this.updateForm ();
    }

    public makeRequest (descriptor : string): Promise <ResponseBox <void>> {
        let password = this.regPassword.value;
        let secret = this.regSecret.value;
        let login = this.regLogin.value;
        let phone = this.regPhone.value;

        if (descriptor === UserRegState.VERIFICATION.value) {
            return CreateController.createUser (login, phone, password, secret);
        } else if (descriptor === UserRegState.FIELDS_FILLING.value) {
            return CreateController.createUser (login, phone, password);
        }
    }

    public handleResponse (response: ResponseBox <void>, descriptor : string): void {
        if (descriptor === UserRegState.FIELDS_FILLING.value) {
            this.checkErrorsAndDo (response, () => {
                this.state = UserRegState.VERIFICATION;
                this.verificationAttempt = 0;
                this.updateForm ();
            });
        } else if (descriptor === UserRegState.VERIFICATION.value) {
            //
        }
    }

    private updateForm () : void {
        if (this.state == UserRegState.FIELDS_FILLING) {
            $(this.regSecretContainer).hide ();

            for (let item of $(".user-reg-main-group")) {
                item.removeAttribute ("disabled");
            }

            let empty = [this.regLogin, this.regPhone, this.regPassword].reduce (
                (prev, curr, idx) => prev || !curr.value, false
            );
            if (!empty) {
                this.regButton.removeAttribute ("disabled");
            } else {
                this.regButton.setAttribute ("disabled", "");
            }

            this.regButtonNotice.innerHTML = "Sign up";
            this.regButton.innerHTML = "Sign up";
        } else if (this.state == UserRegState.VERIFICATION) {
            $(this.regSecretContainer).show ();

            for (let item of $(".user-reg-main-group")) {
                item.setAttribute ("disabled", "");
            }

            this.regButtonNotice.innerHTML = "Verify account";
            this.regButton.innerHTML = "Verify account";
        }
    }

    private performRegistration () : void {
        if (this.state == UserRegState.FIELDS_FILLING) {
            this.reloadData (UserRegState.FIELDS_FILLING.value);
        } else if (this.state == UserRegState.VERIFICATION) {
            this.reloadData (UserRegState.VERIFICATION.value);
        }


    }

    private fillWithRandomPassword () : void {
        this.regPassword.value = null;
        while (!this.regPassword.value || this.regPassword.value.length < 8) {
            this.regPassword.value = Math.random ().toString (36).substr (2);
        }
        this.regPassword.onchange (null);
    }

    private togglePasswordView () : void {
        let classToRemove = this.isPasswordHide ? "btn-outline-secondary" : "btn-secondary";
        this.regPasswordView.classList.remove (classToRemove);

        let classToAdd = this.isPasswordHide ? "btn-secondary" : "btn-outline-secondary";
        this.regPasswordView.classList.add (classToAdd);

        this.regPassword.type = this.isPasswordHide ? "text" : "password";
        this.isPasswordHide = !this.isPasswordHide;
    }
    
    public destroy (): void {}

}

@Enum <UserRegState> ("value")
class UserRegState extends Enumerable {
    
    static readonly FIELDS_FILLING = new UserRegState ("fields-filling"); 
    static readonly VERIFICATION   = new UserRegState ("verification");

    private constructor (readonly value : string) { super (); }

} 