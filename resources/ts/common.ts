//
// (c) Shemplo
//

export function element (id : string) : HTMLElement {
    return document.getElementById (id);
}

export function dataElement (id : string) : HTMLDataElement {
    return element (id) as HTMLDataElement;
}

export function inputElement (id : string) : HTMLInputElement {
    return element (id) as HTMLInputElement;
}

export function clearChildren (element : HTMLElement) : void {
    var iterations = element.children.length;
    for (var i = 0; i < iterations; i++) {
        element.children [0].remove ();
    }
}

export class Pair <F, S> {
    public F : F; public S : S;
}

export function assignType <T> (obj : T, type : any) : T {
    return obj ? Object.setPrototypeOf (obj, type) : obj;
}