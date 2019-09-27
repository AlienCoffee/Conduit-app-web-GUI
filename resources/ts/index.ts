import { NewsWall } from "./components/news-wall";
import { UserProfile } from "./components/base/plofile-component";

//
// (c) Shemplo
//

export let up : UserProfile;
export let nw : NewsWall;

window.onload = function () {
    up = new UserProfile ().init ();
    nw = new NewsWall (-1).init ();
}