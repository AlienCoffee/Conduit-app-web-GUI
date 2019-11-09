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

export function clone <T> (src  : T) : T {
    let copy = new (src.constructor as any) ();
    for (let property in src) {
        if (typeof src [property] === "object" && src [property] != null) {
            if (src [property] instanceof Date) {
                copy [property] = new Date (src [property] as unknown as Date);
            } else {
                copy [property] = clone (src [property]);
            }
        } else {
            copy [property] = src [property];
        }
    }
    return copy;
}

export class Pair <F, S> {
    
    public F : F; public S : S;

    constructor (f? : F, s? : S) {
        this.F = f; this.S = s;
    }

    public static of <F, S> (f : F, s : S) : Pair <F, S> {
        return new Pair (f, s);
    }

}

export type Function <I, O> = (value : I) => O;
export type Consumer <T> = Function <T, void>;
export type Predicate <T> = Function <T, boolean>;

export type BiFunction <I1, I2, O> = (value1 : I1, value2 : I2) => O;
export type BiConsumer <T1, T2> = BiFunction <T1, T2, void>;
export type BiPredicate <T1, T2> = BiFunction <T1, T2, boolean>;