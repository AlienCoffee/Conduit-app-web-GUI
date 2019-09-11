

export abstract class AbstractComponent {

    constructor () { this.init (); }

    public abstract init () : void;

    public abstract destroy () : void;

}