import { LoadingComponent } from "./loading-component";
import { BlogPost, ResponseBox } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";
import { compareDates, element } from "../common";
import { makeBlogPostElement } from "../bridge/gen-htmls";
import { DateUtils } from "../utils/date";

export class NewsWall extends LoadingComponent <BlogPost []> {

    protected nonthingDiv    : HTMLDivElement;
    protected wallDiv        : HTMLDivElement;
    
    protected loadMoreButton : HTMLButtonElement;
    protected loadMore       : HTMLUListElement;

    constructor (
        protected updateInterval : number = null
    ) {
        super (updateInterval);
    }

    public init (): void {
        this.loadMoreButton = element ("news-wall-more-button");
        this.loadMoreButton.onclick = () => this.loadMorePosts ();

        this.nonthingDiv = element ("news-wall-nothing");
        this.loadMore = element ("news-wall-more");
        this.spinner = element ("news-wall-spinner");
        this.wallDiv = element ("news-wall");

        this.reloadData ();
    }

    public makeRequest () : Promise <ResponseBox <BlogPost []>> {
        this.loadMoreButton.setAttribute ("disabled", "");
        return GetController.getMainBlogPosts (null);
    }

    public handleResponse (response: ResponseBox <BlogPost []>): void {
        this.checkErrorsAndDo (response, obj => {
            this.mergeData (obj, false);

            if (this.nonthingDiv != null) {
                this.nonthingDiv.style.display = this.data.length > 0 ? "none" : "block";
            }

            for (let i = this.data.length - 1; i >= 0; i--) {
                let last = i == this.data.length;
                let post = this.data [i];

                if (post.html != null) { continue; } // post is already on screen
                this.renderBlogPost (post, i, last ? null : this.data [i + 1]);
            }

            this.loadMoreButton.removeAttribute ("disabled");
            if (response.params.get ("more") as boolean) {
                $(this.loadMore).show ();
            } else {
                $(this.loadMore).hide ();
            }

            ($('[data-toggle="tooltip"]') as any).tooltip ();
        });
    }

    protected mergeData (receivedPosts : BlogPost [], force : boolean) {
        super.mergeData (receivedPosts, force);

        this.data = this.data.sort ((a, b) => 
            -compareDates (a.published, b.published)
        );
    }

    private renderBlogPost (post : BlogPost, index : number, next : BlogPost) {
        let modified = "last modified by " + post.editor + " at " + post.modified;
        let published = DateUtils.format (post.published, true);
        let likes = post.likes === 1 ? "1 like" : post.likes + " likes";

        let postDiv = makeBlogPostElement (post.author, post.title, modified,
            published, likes, "", post.content);
        post.html = postDiv;

        if (next != null) {
            this.wallDiv.insertBefore (postDiv, next.html);
        } else {
            this.wallDiv.prepend (postDiv);
        }
    }

    private loadMorePosts () : void {

    }

    // this method will be responsible for `heart` button
    private toggleLike () {

    }

}