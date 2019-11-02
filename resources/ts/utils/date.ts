export class DateUtils {

    public static isValid (date : Date) {
        return !isNaN (+date);
    }

    public static format (date : Date, withTime : boolean) : string {
        let dateS = this.formatDate (date);
        if (!withTime) { return dateS; }

        return dateS + " " + this.formatTime (date);
    }

    public static formatDate (date : Date) {
        if (isNaN (date.getTime ())) { return ""; }

        let value = date.getDate ();
        let day = value < 10 ? "0" + value : "" + value;

        value = date.getMonth () + 1;
        let month = value < 10 ? "0" + value : "" + value;

        value = date.getFullYear ();
        let year = "" + value;

        return day + "." + month + "." + year;
    }

    public static formatDateISO (date : Date) {
        if (isNaN (date.getTime ())) { return ""; }

        let value = date.getDate ();
        let day = value < 10 ? "0" + value : "" + value;

        value = date.getMonth () + 1;
        let month = value < 10 ? "0" + value : "" + value;

        value = date.getFullYear ();
        let year = "" + value;

        return year + "-" + month + "-" + day;
    }

    public static formatTime (date : Date) {
        if (isNaN (date.getTime ())) { return ""; }
        
        let value = date.getHours ();
        let hour = value < 10 ? "0" + value : "" + value;

        value = date.getMinutes ();
        let minute = value < 10 ? "0" + value : "" + value;

        value = date.getSeconds ();
        let second = value < 10 ? "0" + value : "" + value;

        return hour + ":" + minute + ":" + second;
    }

    public static compareDates (a : Date, b : Date) : number {
        return a.getTime () - b.getTime ();
    }

}