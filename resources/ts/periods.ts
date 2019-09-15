import { UserProfile } from "./components/plofile-component";
import { PeriodsWall } from "./components/periods-wall";
import { element } from "./common";

export let up : UserProfile;
export let pw : PeriodsWall;

window.onload = function () {
    let spinner = element ("wall-spinner") as HTMLDivElement;
    pw = new PeriodsWall (-1, spinner);
    up = new UserProfile ();
}