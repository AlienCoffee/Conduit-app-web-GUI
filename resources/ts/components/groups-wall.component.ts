import { ResponseBox, GroupEntity } from "../bridge/gen-dtos";
import { element, inputElement } from "../common";
import { GetController } from "../bridge/gen-apis";
import { LoadingWallComponent } from "./base/loading-wall-component";

export class GroupsWall extends LoadingWallComponent <GroupEntity []> {
    
    protected groupsAccess : boolean;
    protected periodId     : number;

    constructor (
        protected updateInterval : number = null,
    ) {
        super ("groups", updateInterval);
    }

    public init () : GroupsWall {
        this.groupsAccess = inputElement ("groups-wall-access").value === "true";
        this.periodId = +inputElement ("period-id").value;
        if (this.groupsAccess) { super.init (); }
        return this;
    }

    public makeRequest (): Promise <ResponseBox <GroupEntity []>> {
        return GetController.getGroups (this.periodId);
    }
    
    public handleResponse (response : ResponseBox <GroupEntity []>): void {
        this.checkErrorsAndDo (response, obj => {
            this.mergeData (obj, true);

            if (this.nonthingDiv != null) {
                this.nonthingDiv.style.display = this.data.length > 0 ? "none" : "block";
            }

            for (let i = this.data.length - 1; i >= 0; i--) {
                let last = i == this.data.length;
                let entity = this.data [i];

                if (entity.html != null) { continue; } // entity is already on screen
                this.renderGroupEntity (entity, i, last ? null : this.data [i + 1]);
            }

            ($('[data-toggle="tooltip"]') as any).tooltip ();
        });
    }

    private renderGroupEntity (period : GroupEntity, index : number, next : GroupEntity) {
        //
    }

}