import { LoadingComponent } from "./base/loading-component";
import { AbstractComponent } from "./base/abstract-component";
import { ResponseBox, PeriodEntity, PeriodStatus } from "../bridge/gen-dtos";
import { element, inputElement, Consumer, BiConsumer, clone } from "../common";
import { LoadingWallComponent } from "./base/loading-wall-component";
import { DateUtils } from "../utils/date";
import { UpdateController, CreateController } from "../bridge/gen-apis";

export class PeriodEditorComponent extends LoadingComponent <any> {

    protected cancelButton : HTMLButtonElement;
    protected saveButton : HTMLButtonElement;
    protected spinner : HTMLDivElement;
    protected form : HTMLDivElement;
    protected stub : HTMLDivElement;

    protected isNew : boolean = false;
    protected entity : PeriodEntity;

    protected title : HTMLInputElement;
    protected description : HTMLInputElement;
    protected status : HTMLSelectElement;
    protected sinceDate : HTMLInputElement;
    protected sinceTime : HTMLInputElement;
    protected untilDate : HTMLInputElement;
    protected untilTime : HTMLInputElement;
    protected issuedDate : HTMLInputElement;
    protected issuedTime : HTMLInputElement;

    protected subscriptions : Map <string, BiConsumer <PeriodEntity, boolean>> 
        = new Map ();

    public init () : PeriodEditorComponent {
        this.spinner = element ("period-editor-spinner");
        this.spinner.classList.remove ("hidden");
        $(this.spinner).hide ();

        this.form = element ("period-editor-div");
        this.form.classList.remove ("hidden");
        $(this.form).hide ();

        this.title = inputElement ("period-editor-title");
        this.description = inputElement ("period-editor-desc");
        this.status = element ("period-editor-status");
        this.sinceDate = inputElement ("period-editor-since-date");
        this.sinceTime = inputElement ("period-editor-since-time");
        this.untilDate = inputElement ("period-editor-until-date");
        this.untilTime = inputElement ("period-editor-until-time");
        this.issuedDate = inputElement ("period-editor-issued-date");
        this.issuedTime = inputElement ("period-editor-issued-time");

        this.cancelButton = element ("period-editor-cancel");
        this.cancelButton.onclick = event => {
            $(this.stub).show (); $(this.form).hide ();
        };

        this.saveButton = element ("period-editor-save");
        this.saveButton.onclick = event => this.saveEditorChanges ();

        this.stub = element ("period-editor-stub");

        return this;
    }

    public openEditorFor (period : PeriodEntity) : void {
        this.entity = period ? clone (period) : new PeriodEntity ();
        this.isNew = period == null;

        this.title.value = this.entity.name ? this.entity.name : "";
        this.description.value = this.entity.description ? this.entity.description : "";
        if (this.isNew) { 
            $ (this.status.parentElement.parentElement).hide (); 
        } else {
            for (let child of this.status.children) {
                let option = child as HTMLOptionElement;
                if (this.entity.status && option.value == this.entity.status.name) {
                    option.setAttribute ("selected", "");
                } else {
                    option.removeAttribute ("selected");
                }
            }

            $ (this.status.parentElement.parentElement).show ();
        }
        this.sinceDate.value = this.entity.since 
            ? DateUtils.formatDateISO (this.entity.since) : "";
        this.sinceTime.value = this.entity.since 
            ? DateUtils.formatTime (this.entity.since) : "";
        this.untilDate.value = this.entity.until 
            ? DateUtils.formatDateISO (this.entity.until) : "";
        this.untilTime.value = this.entity.until 
            ? DateUtils.formatTime (this.entity.until) : "";
        let issuedDiv = element ("period-editor-issued-date").parentElement.parentElement;
        if   (this.isNew) { $ (issuedDiv).hide (); } 
        else {
            this.issuedDate.value = this.entity.issued 
                ? DateUtils.formatDateISO (this.entity.issued) : "";
            this.issuedTime.value = this.entity.issued 
                ? DateUtils.formatTime (this.entity.issued) : "";
            $ (issuedDiv).show ();
        }

        $(this.stub).hide ();
        $(this.form).show ();
    }

    private saveEditorChanges () : void {
        if (!this.isNew) {
            this.reloadData ("status");
        }
        this.reloadData ("parameters");
    }

    public makeRequest (descriptor? : string) : Promise <ResponseBox <any>> {
        if (!this.entity) { return; }

        if (descriptor == "status") {
            this.entity.status = PeriodStatus.valueByName (this.status.value);

            this.notifyAll (this.entity, false);
            return UpdateController.changePeriodState (
                this.entity.id, this.status.value
            );
        } else if (descriptor == "parameters") {
            let since = this.sinceDate.value + "T" + this.sinceTime.value;
            let until = "";

            if (this.untilDate.value.length > 0 && this.untilTime.value.length > 0) {
                until = this.untilDate.value + "T" + this.untilTime.value;
                this.entity.until = new Date (until);
            }
            
            this.entity.description = this.description.value;
            this.entity.since = new Date (since);
            this.entity.name = this.title.value;

            this.notifyAll (this.entity, this.isNew);
            if (this.isNew) {
                return CreateController.createPeriod (
                    this.title.value, since, 
                    this.description.value,
                    until.length > 0 ? until : null
                );
            } else {
                return null; // TODO
            }
        }

        return null;
    }

    public onRequestFinised (descriptor? : string) : void {
        if (this.spinner) { $(this.spinner).hide (); }
    }

    public handleResponse (response : ResponseBox <any>, descriptor? : string) : void {
        this.checkErrorsAndDo (response, answer => {
            //
        });
    }

    public subscribe (key : string, callback : BiConsumer <PeriodEntity, boolean>) : void {
        this.subscriptions.set (key, callback);
    }

    private notifyAll (entity : PeriodEntity, isNew : boolean) {
        for (let callback of this.subscriptions.values ()) {
            callback (entity, isNew);
        }
    }

}