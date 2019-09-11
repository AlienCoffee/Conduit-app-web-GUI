import { NewsWall } from "./components/news-wall";
import { PopupTile } from "./popup";
import { element } from "./common";

//
// (c) Shemplo
//

export let nwd  : HTMLDivElement;    // news wall div
export let nwnd : HTMLDivElement;    // news wall nothing div
export let nwm  : HTMLUListElement;  // news wall more
export let nwmb : HTMLButtonElement; // news wall more button
export let nw   : NewsWall;

window.onload = function () {
    nwmb = element ("news-wall-more-button") as HTMLButtonElement;
    nwnd = element ("news-wall-nothing") as HTMLDivElement;
    nwm = element ("news-wall-more") as HTMLUListElement;
    $(nwm).hide ();
    nwd = element ("news-wall") as HTMLDivElement;

    let spinner = element ("news-wall-spinner") as HTMLDivElement;
    nw = new NewsWall (-1, spinner, nwd, nwnd, nwm, nwmb);
    nw.reloadData ();
}