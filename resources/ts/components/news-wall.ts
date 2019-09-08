import { LoadingComponent } from "./loading-component";
import { BlogPost, ResponseBox } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";


export class NewsWall extends LoadingComponent <ResponseBox <Array <BlogPost>>> {

    constructor (
        updateInterval : number = null,
        spinner        : HTMLDivElement = null
    ) {
        super (updateInterval, spinner);
    }

    public init (): void {}

    public makeRequest () : Promise <ResponseBox <Array <BlogPost>>> {
        return GetController.getChannelBlogPosts ("main", "");
    }

    public handleResponse (response: ResponseBox <Array <BlogPost>>): void {
        this.checkErrorsAndDo (response, obj => {
            
        });
    }

}