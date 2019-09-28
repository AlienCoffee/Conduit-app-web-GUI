import { ResponseBox, GroupEntity } from "../bridge/gen-dtos";
import { element, inputElement } from "../common";
import { GetController } from "../bridge/gen-apis";
import { LoadingWallComponent } from "./base/loading-wall-component";
import { makeGroupListElement } from "../bridge/gen-htmls";
import { DateUtils } from "../utils/date";
import { WarningPopupTile } from "../popup";

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

    private renderGroupEntity (group : GroupEntity, index : number, next : GroupEntity) {
        let published = DateUtils.format (new Date (), true);
        let groupLI = makeGroupListElement ("" + group.id, group.name, published, 
            group.type._name, "author", "members", group.joinType.name, 
            group.description);
        groupLI.onclick = function () {
            let gidHolder = $(groupLI).find ("input[type=hidden]") 
                            [0] as HTMLInputElement;
                            
            if (gidHolder) {
                location.href = "/group/" + gidHolder.value;
            } else {
                new WarningPopupTile (3, "Element missed", 
                    "Period ID holder element not found")
                    .show ();
            }
        }
        group.html = groupLI;

        if (next != null) {
            this.wall.insertBefore (groupLI, next.html);
        } else {
            this.wall.prepend (groupLI);
        }
    }

}