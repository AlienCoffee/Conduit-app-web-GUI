import { NewsWall } from "./components/news-wall";
import { PopupTile } from "./popup";
import { element } from "./common";

//
// (c) Shemplo
//

export let nwd  : HTMLDivElement; // news wall div
export let nwnd : HTMLDivElement; // news wall nothing div
export let nw   : NewsWall;

window.onload = function () {
    nwnd = element ("news-wall-nothing") as HTMLDivElement;
    nwd = element ("news-wall") as HTMLDivElement;

    let spinner = element ("news-wall-spinner") as HTMLDivElement;
    nw = new NewsWall (-1, spinner, nwd, nwnd);
    nw.reloadData ();
}