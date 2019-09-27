import { UserProfile } from "./components/base/plofile-component"
import { GroupsWall } from "./components/groups-wall.component";

let up : UserProfile;
let gw : GroupsWall;

window.onload = function () {
    up = new UserProfile ().init ();
    gw = new GroupsWall ().init ();

    ($('[data-toggle="tooltip"]') as any).tooltip ();
}