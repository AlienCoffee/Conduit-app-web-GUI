import { AbstractComponent } from "./abstract-component";
import { element, inputElement } from "../common";
import { sendRequest, NetworkError, catchErrorWithSpinner } from "../network";
import { ErrorPopupTile } from "../popup";

export class UserProfile extends AbstractComponent {

    protected spinner       : HTMLDivElement
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
        this.spinner = element ("user-profile-spinner");
        if (this.spinner) { $(this.spinner).hide (); }
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
        formData.append ("username", login);

        if (this.spinner) { $(this.spinner).show (); }
        sendRequest ("POST", "/api/unchecked/login", formData).then ((response : any) => {
            if (response.authorized as boolean) { location.reload (); }
        }).catch ((rej : NetworkError) => {
            catchErrorWithSpinner (rej, this.spinner);
        });
    }

    private performLogout () : void {
        if (this.spinner) { $(this.spinner).show (); }
        sendRequest ("POST", "/api/logout", null).then ((response : any) => {
            if (this.spinner) { $(this.spinner).hide (); }
            if (!(response.authorized as boolean)) { location.reload (); }
        }).catch ((rej : NetworkError) => {
            if (this.spinner) { $(this.spinner).hide (); }

            if (rej instanceof NetworkError && !rej.isSystem ()) {
                var comment = rej.getComment (), message = rej.message;
                var tile = new ErrorPopupTile (5, message, comment);
                tile.show ();
            } else { console.log (rej); }
        });
    }
    
    public destroy (): void {

    }

}