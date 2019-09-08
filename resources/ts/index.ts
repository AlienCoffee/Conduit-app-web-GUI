import { NewsWall } from "./components/news-wall";
import { PopupTile } from "./popup";
import { element } from "./common";

//
// (c) Shemplo
//

var nw : NewsWall = null;

window.onload = function () {
    var spinner = element ("news-wall-spinner") as HTMLDivElement;
    nw = new NewsWall (-1, spinner);
    nw.reloadData ();
}