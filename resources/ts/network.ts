//
// (c) Shemplo
//

export function sendRequest <T> (method : string, url : string, data : FormData) : Promise <T> {
    var metas = document.getElementsByTagName ("meta");
	var token  = metas ["_csrf"].getAttribute ("content");
	var header = metas ["_csrf_header"].getAttribute ("content");

    return new Promise <T> ((res, rej) => {
        var descriptor = new XMLHttpRequest ();
        
        descriptor.onreadystatechange = function () {
            if (descriptor.readyState != 4) { return; }

            if (descriptor.status >= 200 && descriptor.status < 300) {
                var text = descriptor.responseText;
                if (text && (text.startsWith ("{") || text.startsWith ("["))) {
                    res (JSON.parse (descriptor.responseText) as T);
                } else {
                    var message = "Server returned answer that can't be parsed" 
                                + " (see console for details)";
                    console.log (text);
                    //rej (message);
                }
            } else {
                var message = "Some error occured during connection to server (code " 
                            + descriptor.status + ")";
                //rej (message);
            }
        };

        descriptor.onerror = function (pe : ProgressEvent) {
            var error = new NetworkError ("Failed to make request to server", 
                "Check your internet connection", false);
            rej (error);
        }
        
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