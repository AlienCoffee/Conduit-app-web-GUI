import { OfficePeriodFollower } from "../components/office-period-follower";

export let off : OfficePeriodFollower;

window.onload = function () {
    off = new OfficePeriodFollower ().init ();
}