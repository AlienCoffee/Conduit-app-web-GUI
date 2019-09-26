import { LoadingComponent } from "./loading-component";
import { ResponseBox } from "../bridge/gen-dtos";
import { element, inputElement } from "../common";
import { GetController } from "../bridge/gen-apis";

export class GroupsWall extends LoadingComponent <any> {

    protected wallUL       : HTMLUListElement;
    
    protected groupsAccess : boolean;
    protected periodId     : number;

    constructor (
        protected updateInterval : number = null,
    ) {
        super (updateInterval);
    }

    public init (): void {
        this.groupsAccess = inputElement ("groups-wall-access").value === "true";
        this.periodId = +inputElement ("period-id").value;

        if (this.groupsAccess) {
            this.spinner = element ("groups-wall-spinner");
            this.wallUL = element ("groups-wall");
            this.reloadData ();
        }
    }

    public makeRequest (descriptor? : string): Promise <ResponseBox <any>> {
        return GetController.getGroups (this.periodId);
    }
    
    public handleResponse (response : ResponseBox <any>, descriptor? : string): void {
        //
    }

}