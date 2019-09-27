

export abstract class AbstractComponent {

    constructor () {}

    public abstract init () : AbstractComponent;

    public abstract destroy () : void;

}