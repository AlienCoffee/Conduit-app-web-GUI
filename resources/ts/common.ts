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

export function clone <T> (object  : T) : T {
    let copy = new (object.constructor ());
    for (let property in object) {
        if (typeof object [property] === "object") {
            copy [property] = copy (object [property]);
        } else {
            copy [property] = object [property];
        }
    }
    return copy;
}

export class Pair <F, S> {
    public F : F; public S : S;
}

export type Function <I, O> = (value : I) => O;
export type Consumer <T> = Function <T, void>;
export type Predicate <T> = Function <T, boolean>;

export type BiFunction <I1, I2, O> = (value1 : I1, value2 : I2) => O;
export type BiConsumer <T1, T2> = BiFunction <T1, T2, void>;
export type BiPredicate <T1, T2> = BiFunction <T1, T2, boolean>;