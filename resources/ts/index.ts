import { NewsWall } from "./components/news-wall";
import { UserProfile } from "./components/plofile-component";

//
// (c) Shemplo
//

export let up : UserProfile;
export let nw : NewsWall;

window.onload = function () {
    up = new UserProfile ();
    nw = new NewsWall (-1);
}