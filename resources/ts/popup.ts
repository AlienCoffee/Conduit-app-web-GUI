//
// (c) Shemplo
//

import { element } from './common'

export class PopupTile {

    protected tile    : HTMLDivElement;
    protected title   : HTMLDivElement;
    protected message : HTMLDivElement;

    constructor (
        protected timeout : number,
        title   : string,
        message : string,
        style   : string
    ) {
        this.tile = document.createElement ("div");
        this.tile.classList.add ("toast");
    
        this.title = document.createElement ("div");
        this.title.classList.add ("toast-header");
        this.tile.appendChild (this.title);
        
        var strong = document.createElement ("strong");
        strong.classList.add ("mr-auto", style);
        this.title.appendChild (strong);
        strong.innerHTML = title;
    
        this.message = document.createElement ("div");
        this.message.classList.add ("toast-body");
        this.tile.appendChild (this.message);
        this.message.innerHTML = message;
    }

    public changeTitle (title : string) : PopupTile {
        this.title.innerHTML = title;
        return this;
    }
    
    public changeMessage (message : string) : PopupTile {
        this.message.innerHTML = message;
        return this;
    }

    protected static styles = ["text-info", "text-success", "text-warning", "text-danger"];

    public changeStyle (style : string) : PopupTile {
        PopupTile.styles.forEach (st => this.tile.classList.remove (st));
        this.tile.classList.add (style);

        return this;
    }

    public switchToInfo () : PopupTile { 
        this.changeStyle (PopupTile.styles [0]); 
        return this;
    }

    public switchToError () : PopupTile { 
        this.changeStyle (PopupTile.styles [3]); 
        return this;
    }

    public show () {
        element ("popup").prepend (this.tile);
        this.destructAfter (this.timeout);
        this.tile.style.opacity = "1";
    }

    public destructAfter (timeout : number) {
        if (timeout > 0 && timeout <= 300) { // from 1 to 300 seconds
            setTimeout (() => this.delete (), timeout * 1000);
        }
    }

    public delete () {
        element ("popup").removeChild (this.tile);
    }

}

export class InfoPopupTile extends PopupTile {

    constructor (
        timeout : number,
        title   : string,
        message : string
    ) { 
        var style : string = PopupTile.styles [0];
        super (timeout, title, message, style); 
    }

}

export class ErrorPopupTile extends PopupTile {

    constructor (
        timeout : number,
        title   : string,
        message : string
    ) { 
        var style : string = PopupTile.styles [3];
        super (timeout, title, message, style); 
    }

}