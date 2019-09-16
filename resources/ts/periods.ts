import { UserProfile } from "./components/plofile-component";
import { PeriodsWall } from "./components/periods-wall";
import { element } from "./common";

export let up : UserProfile;
export let pw : PeriodsWall;

window.onload = function () {
    pw = new PeriodsWall (-1);
    up = new UserProfile ();
}