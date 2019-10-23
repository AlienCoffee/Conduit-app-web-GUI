import { LoadingComponent } from "./base/loading-component";
import { AbstractComponent } from "./base/abstract-component";
import { ResponseBox, PeriodEntity } from "../bridge/gen-dtos";
import { element, inputElement } from "../common";
import { LoadingWallComponent } from "./base/loading-wall-component";
import { DateUtils } from "../utils/date";

export class PeriodEditorComponent extends LoadingComponent <any> {

    protected saveButton : HTMLButtonElement;
    protected spinner : HTMLDivElement;
    protected form : HTMLDivElement;
    protected stub : HTMLDivElement;

    protected isNew : boolean = false;
    protected entity : PeriodEntity;

    public init () : PeriodEditorComponent {
        this.spinner = element ("period-editor-spinner");
        this.spinner.classList.remove ("hidden");
        $(this.spinner).hide ();

        this.form = element ("period-editor-div");
        this.form.classList.remove ("hidden");
        $(this.form).hide ();

        this.saveButton = element ("period-editor-save");
        this.stub = element ("period-editor-stub");

        return this;
    }

    public openEditorFor (period : PeriodEntity) : void {
        this.entity = period ? period : new PeriodEntity ();
        this.isNew = period == null;

        inputElement ("period-editor-title").value = 
            this.entity.name ? this.entity.name : "";
        inputElement ("period-editor-desc").value = 
            this.entity.description ? this.entity.description : "";
        for (let child of element ("period-editor-status").children) {
            let option = child as HTMLOptionElement;
            if (this.entity.status && option.value == this.entity.status.name) {
                option.setAttribute ("selected", "");
            } else {
                option.removeAttribute ("selected");
            }
        }
        inputElement ("period-editor-since-date").value = 
            this.entity.since ? DateUtils.formatDateISO (this.entity.since) : "";
        inputElement ("period-editor-since-time").value = 
            this.entity.since ? DateUtils.formatTime (this.entity.since) : "";
        inputElement ("period-editor-until-date").value = // add validation for NAD
            this.entity.until ? DateUtils.formatDateISO (this.entity.until) : "";
        inputElement ("period-editor-until-time").value = 
            this.entity.until ? DateUtils.formatTime (this.entity.until) : "";
        inputElement ("period-editor-issued-date").value = 
            this.entity.issued ? DateUtils.formatDateISO (this.entity.issued) : "";
        inputElement ("period-editor-issued-time").value = 
            this.entity.issued ? DateUtils.formatTime (this.entity.issued) : "";

        $(this.stub).hide ();
        $(this.form).show ();
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <any>> {
        return null;
    }

    public onRequestFinised (descriptor? : string) : void {
        //
    }

    public handleResponse (response : ResponseBox <any>, descriptor? : string) : void {
        //
    }

}