import { LoadingComponent } from "./loading-component";
import { BlogPost, ResponseBox } from "../bridge/gen-dtos";
import { GetController } from "../bridge/gen-apis";
import { compareDates } from "../common";
import { makeBlogPostElement } from "../bridge/gen-htmls";

export class NewsWall extends LoadingComponent <ResponseBox <BlogPost []>> {

    private posts : BlogPost [] = [];

    constructor (
        protected updateInterval : number = null,
        protected spinner        : HTMLDivElement = null,
        protected div            : HTMLDivElement,
        protected noDiv          : HTMLDivElement,
        protected loadMore       : HTMLUListElement,
        protected loadMoreButton : HTMLButtonElement
    ) {
        super (updateInterval, spinner);
    }

    public init (): void {}

    public makeRequest () : Promise <ResponseBox <BlogPost []>> {
        return GetController.getMainBlogPosts (null);
    }

    public handleResponse (response: ResponseBox <BlogPost []>): void {
        this.loadMoreButton.setAttribute ("disabled", "");
        this.checkErrorsAndDo (response, obj => {
            this.mergeBlogPosts (this.posts, obj);
            if (this.noDiv != null) {
                this.noDiv.style.display = this.posts.length > 0 
                                         ? "none" : "block";
            }

            for (let i = this.posts.length - 1; i >= 0; i--) {
                let last = i == this.posts.length;
                let post = this.posts [i];

                if (post.html != null) { continue; } // post is already on screen
                this.renderBlogPost (post, i, last ? null : this.posts [i + 1]);
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

    private mergeBlogPosts (posts : BlogPost [], receivedPosts : BlogPost []) {
        let ids = new Set (posts.map (post => post.postId));

        receivedPosts = receivedPosts.filter (post => !ids.has (post.postId));
        posts.push (...receivedPosts);

        posts.sort ((a, b) => compareDates (a.published, b.published));
    }

    private renderBlogPost (post : BlogPost, index : number, next : BlogPost) {
        let likes = post.likes === 1 ? "1 like" : post.likes + " likes";
        let postDiv = makeBlogPostElement (post.author, post.title, 
            post.published.toString (), likes, "", post.content);
        post.html = postDiv;

        if (next != null) {
            this.div.insertBefore (postDiv, next.html);
        } else {
            this.div.prepend (postDiv);
        }
    }

    // this method will be responsible for `heart` button
    public toggleLike () {

    }

}