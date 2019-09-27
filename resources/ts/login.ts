import { UserProfile } from "./components/base/plofile-component";

//
// (c) Shemplo
//

export let up : UserProfile;

window.onload = function () {
    up = new UserProfile ().init ();
}