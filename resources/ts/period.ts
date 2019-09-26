import { UserProfile } from "./components/plofile-component"
import { GroupsWall } from "./components/groups-wall.component";

let up : UserProfile;
let gw : GroupsWall;

window.onload = function () {
    up = new UserProfile ();
    gw = new GroupsWall ();

    ($('[data-toggle="tooltip"]') as any).tooltip ();
}