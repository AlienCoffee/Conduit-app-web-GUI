import { AbstractComponent } from "./abstract-component";
import { element, inputElement } from "../common";
import { sendRequest } from "../network";

export class UserProfile extends AbstractComponent {

    protected isAuthorizedE : HTMLInputElement;
    protected isAuthorized  : boolean;

    protected loginPassword : HTMLInputElement;
    protected loginLogin    : HTMLInputElement;
    protected loginButton   : HTMLButtonElement;

    protected logoutButton : HTMLButtonElement;

    constructor (

    ) {
        super ();
    }

    public init (): void {
        this.isAuthorizedE = inputElement ("user-profile-authorized");
        this.isAuthorized = JSON.parse (this.isAuthorizedE.value);
        if (this.isAuthorized) {
            this.logoutButton = element ("user-profile-logout-button");
            this.logoutButton.onclick = event => {
                event.preventDefault ();
                this.performLogout ();
            };
        } else {
            this.loginPassword = inputElement ("user-profile-password-field");
            this.loginLogin = inputElement ("user-profile-login-field");
            this.loginButton = element ("user-profile-login-button");
            this.loginButton.onclick = event => {
                event.preventDefault ();
                this.performLogin ();
            };
        }
    }    

    private performLogin () : void {
        if (this.isAuthorized) { return; } // user is already authorized

        let login = this.loginLogin.value, password = this.loginPassword.value;
        let formData = new FormData ();

        formData.append ("password", password);
        formData.append ("remember-me", "on");
        formData.append ("login", login);

        sendRequest ("POST", "/api/unchecked/login", formData).then ((response : any) => {
            if (response.authorized as boolean) { location.reload (); }
        });
    }

    private performLogout () : void {
        sendRequest ("POST", "/api/logout", null).then ((response : any) => {
            if (!(response.authorized as boolean)) { location.reload (); }
        });
    }
    
    public destroy (): void {

    }

}