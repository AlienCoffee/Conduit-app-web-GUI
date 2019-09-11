import { LoadingComponent } from "./loading-component";
import { ResponseBox, PeriodEntity } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";

export class PeriodsWall extends LoadingComponent <ResponseBox <PeriodEntity []>> {

    constructor (
        protected updateInterval : number = null,
        protected spinner        : HTMLDivElement = null
    ) {
        super (updateInterval, spinner);
    }

    public init (): void {}

    public makeRequest (): Promise<ResponseBox <PeriodEntity []>> {
        return GetController.getPeriods ();
    }    
    
    public handleResponse (response: ResponseBox <PeriodEntity []>): void {

    }

}