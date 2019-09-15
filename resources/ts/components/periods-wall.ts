import { LoadingComponent } from "./loading-component";
import { ResponseBox, PeriodEntity } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";
import { compareDates, element } from "../common";
import { makePeriodListElement } from "../bridge/gen-htmls";

export class PeriodsWall extends LoadingComponent <PeriodEntity []> {

    protected wallUL      : HTMLUListElement;
    protected nonthingDiv : HTMLDivElement;

    constructor (
        protected updateInterval : number = null,
        protected spinner        : HTMLDivElement = null
    ) {
        super (updateInterval, spinner);
    }

    public init (): void {
        this.nonthingDiv = element ("periods-wall-nothing");
        this.wallUL = element ("periods-wall");

        this.reloadData ();
    }

    public makeRequest (): Promise<ResponseBox <PeriodEntity []>> {
        return GetController.getAvailablePeriods (null);
    }    
    
    public handleResponse (response: ResponseBox <PeriodEntity []>): void {
        this.checkErrorsAndDo (response, obj => {
            this.mergeData (obj);

            if (this.nonthingDiv != null) {
                this.nonthingDiv.style.display = this.data.length > 0 ? "none" : "block";
            }

            for (let i = this.data.length - 1; i >= 0; i--) {
                let last = i == this.data.length;
                let entity = this.data [i];

                if (entity.html != null) { continue; } // entity is already on screen
                this.renderPeriodEntity (entity, i, last ? null : this.data [i + 1]);
            }

            ($('[data-toggle="tooltip"]') as any).tooltip ();
        });
    }

    protected mergeData (receivedData : PeriodEntity []) {
        super.mergeData (receivedData, false);

        let now = new Date ();
        this.data.forEach (ent => ent.started = 
            compareDates (now, ent.since) >= 0
        );

        this.data = this.data.sort ((a, b) => {
            if (a.started) {
                if (b.started) {
                    return compareDates (a.since, b.since);
                } else {
                    return -1; // a < b, a should be higher
                }
            } else {
                if (b.started) {
                    return 1; // b < a, b should be higher
                } else {
                    return compareDates (a.issued, b.issued);
                }
            }
        });
    }

    private renderPeriodEntity (period : PeriodEntity, index : number, next : PeriodEntity) {
        let periodLI = makePeriodListElement (period.name, "" + period.issued, 
            period.author.login, "" + period.since, "" + period.status, 
            period.description);
        period.html = periodLI;

        if (next != null) {
            this.wallUL.insertBefore (periodLI, next.html);
        } else {
            this.wallUL.prepend (periodLI);
        }
    }

}