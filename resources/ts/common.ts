//
// (c) Shemplo
//

export function element <T extends HTMLElement> (id : string) : T {
    return document.getElementById (id) as T;
}

export function dataElement (id : string) : HTMLDataElement {
    return element (id) as HTMLDataElement;
}

export function inputElement <T extends HTMLInputElement> (id : string) : T {
    return element (id) as T;
}

export function clearChildren (element : HTMLElement) : void {
    if (!element) { return; }
    
    var iterations = element.children.length;
    for (var i = 0; i < iterations; i++) {
        element.children [0].remove ();
    }
}

export function assignType <T> (obj : T, type : any) : T {
    return obj ? Object.setPrototypeOf (obj, type) : obj;
}

export function compareDates (a : Date, b : Date) : number {
    return a.getTime () - b.getTime ();
}

export class Pair <F, S> {
    public F : F; public S : S;
}