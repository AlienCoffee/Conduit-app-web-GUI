import { LoadingComponent } from "./loading-component";
import { BlogPost, ResponseBox } from "../bridge/gen-dtos";


export class NewsWall extends LoadingComponent <ResponseBox <Array <BlogPost>>> {

    constructor (
        updateInterval : number
    ) {
        super (updateInterval);
    }

    public init (): void {
        
    }

    public interpretateResponse (response: ResponseBox <Array <BlogPost>>): void {
        //
    }

}