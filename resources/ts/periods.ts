import { UserProfile } from "./components/base/plofile-component";
import { PeriodsWall } from "./components/periods-wall";

export let up : UserProfile;
export let pw : PeriodsWall;

window.onload = function () {
    pw = new PeriodsWall (-1).init ();
    up = new UserProfile ().init ();
}