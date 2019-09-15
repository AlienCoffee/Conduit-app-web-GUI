export class DateUtils {

    public static format (date : Date, withTime : boolean) : string {
        let value = date.getDate ();
        let day = value < 10 ? "0" + value : "" + value;

        value = date.getMonth () + 1;
        let month = value < 10 ? "0" + value : "" + value;

        value = date.getFullYear ();
        let year = "" + value;

        let dateS = day + "." + month + "." + year;
        if (!withTime) { return dateS; }

        value = date.getHours ();
        let hour = value < 10 ? "0" + value : "" + value;

        value = date.getMinutes ();
        let minute = value < 10 ? "0" + value : "" + value;

        value = date.getSeconds ();
        let second = value < 10 ? "0" + value : "" + value;

        let timeS = hour + ":" + minute + ":" + second;
        return dateS + " " + timeS;
    }

}