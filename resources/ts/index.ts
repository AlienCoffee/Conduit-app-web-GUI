import { NewsWall } from "./components/news-wall";
import { PopupTile } from "./popup";
import { element } from "./common";
import { UserProfile } from "./components/plofile-component";

//
// (c) Shemplo
//

export let up : UserProfile;
export let nw : NewsWall;

window.onload = function () {
    let spinner = element ("wall-spinner") as HTMLDivElement;
    nw = new NewsWall (-1, spinner);
    up = new UserProfile ();
}