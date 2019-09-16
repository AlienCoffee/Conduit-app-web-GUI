import { ResponseBox } from "./bridge/gen-dtos";

//
// (c) Shemplo
//

export function sendRequest <T extends ResponseBox <any>> (method : string, 
        url : string, data : FormData) : Promise <T> {
    var metas = document.getElementsByTagName ("meta");
	var token  = metas ["_csrf"].getAttribute ("content");
	var header = metas ["_csrf_header"].getAttribute ("content");

    return new Promise <T> ((res, rej) => {
        var descriptor = new XMLHttpRequest ();
        
        descriptor.onerror = function (pe : ProgressEvent) {
            let error = new NetworkError ("Failed to make request to server", 
                "Check your internet connection", false);
            rej (error);
        }

        descriptor.onreadystatechange = function () {
            if (descriptor.readyState != 4) { return; }
            console.log (descriptor);

            let responseText = descriptor.responseText;
            try {
                let response = JSON.parse (responseText) as T;
                if   (!response.error) { res (response); } 
                else { 
                    let title = "Error occured";
                    let message = !response.message || response.message.length == 0
                                ? "(No commentaries from server for this error)"
                                : response.message;
                    rej (new NetworkError (title, message, false));
                }
            } catch (error) { // everything is bad b/c it is not JSON answer
                if (descriptor.status == 0 || descriptor.responseURL == "") {
                    descriptor.onerror (null);
                } else {
                    let isSystemError = descriptor.status >= 500;
                    let title = "Critical error occured";
                    let message = "Response code: " + descriptor.status + ". ";
                    if (descriptor.responseText != null && descriptor.responseText.length > 0) {
                        message += "Server answer is available in console log";
                    } else {
                        message += "No iformation provided for this error";
                    }
    
                    rej (new NetworkError (title, message, isSystemError));
                }
            }
        };
        
        descriptor.open (method, url, true);
        descriptor.setRequestHeader (header, token);
        descriptor.send (data);
    });
}

export class NetworkError implements Error {
    
    name: string = "Network Error";

    message: string;
    stack?: string;

    constructor (
        message  : string, 
        protected comment  : string,
        protected system : boolean = true
    ) {
        this.message = message;
    }

    public getComment () { return this.comment; }

    public isSystem () { return this.system; }

}

/*
export class PostRequestWithFiles extends PostRequest {

    constructor (
        protected url  : string,
        protected data : {},
        protected input: HTMLInputElement
    ) { super (url, data); };

    protected form = new FormData ();

    protected sendRequest (descriptor : XMLHttpRequest) {
        descriptor.send (this.form);
    }

    protected createRequest <T> (handler : (response : T) => void, 
            fixer? : (response : string) => boolean) : XMLHttpRequest {
        var descriptor = super.createRequest (handler, fixer);
        for (var i = 0; i < this.input.files.length; i++) {
            var file = this.input.files [i];
            this.form.append (file.name, file, file.name);
        }

        Object.keys (this.data).forEach (key => {
            this.form.append (key, this.data [key]);
        });

        return descriptor;
    }

}
*/