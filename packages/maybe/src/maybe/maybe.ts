// Maybe<T>, Just<T>, Null<T>, Nothing<T> are cross-dependent and create cyclic dependency.
/* eslint-disable max-classes-per-file */
import { Predicate, Unary, isAbsent, isNull, isPresent, isUndefined } from './value';

export type Nullary<T> = () => T;
export type Fallback<T> = T | Nullary<T>;

export type Bind<T, R> = Unary<T, Maybe<R>> | Unary<T, R | undefined | null>;
export type ArrayElement<T> = T extends (infer V)[] ? V : undefined;

export abstract class Maybe<T> {
    protected constructor(
        public readonly value: T | undefined | null,
    ) {
    }

    public that(is: Predicate<T>): Maybe<T> {
        if (isAbsent(this.value) || is(this.value)) {
            return this;
        }
        return nothing();
    }

    public then<R>(next: Bind<T, R>): Maybe<R> {
        if (isAbsent(this.value)) {
            return nothing();
        }
        return maybeOf<R>(next(this.value));
    }

    public pick<K extends keyof T>(property: K): Maybe<T[K]> {
        return this.then(v => v[property]);
    }

    public index(index: number): Maybe<ArrayElement<T>> {
        if (Array.isArray(this.value)) {
            return maybe<ArrayElement<T>>(this.value[index]);
        }
        return nothing();
    }

    public otherwise(fallback: Fallback<T>): Just<T> {
        if (isPresent(this.value)) {
            return just(this.value);
        }
        return just(fallbackTo(fallback));
    }

    public or(fallback: Fallback<T>): T
    public or(fallback: null): T | null
    public or(fallback: undefined): T | undefined
    public or(fallback: Fallback<T> | null | undefined): T | null | undefined {
        if (isPresent(this.value)) {
            return this.value;
        }
        if (isPresent(fallback)) {
            return fallbackTo(fallback);
        }
        return fallback;
    }

    public maybe<R>(next: Bind<T | undefined | null, R>): Maybe<R> {
        return maybeOf(next(this.value));
    }

    public optional<R>(next: Bind<T | undefined, R>): Maybe<R> {
        if (isNull(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }

    public nullable<R>(next: Bind<T | null, R>): Maybe<R> {
        if (isUndefined(this.value)) {
            return nothing();
        }
        return maybeOf(next(this.value));
    }
}

/**
 * @sealed
 */
export class Just<T>
    extends Maybe<T> {
    public constructor(
        public readonly value: T,
    ) {
        super(value);
    }
}

export function just<T>(value: T): Just<T> {
    return new Just<T>(value);
}

/**
 * @sealed
 */
export class Nothing<T>
    extends Maybe<T> {
    public readonly value: undefined = undefined;

    public constructor() {
        super(undefined);
    }
}

const none: Nothing<unknown> = new Nothing<unknown>();

export function nothing<T>(): Nothing<T> {
    return none as Nothing<T>;
}

/**
 * @sealed
 */
export class Nil<T>
    extends Maybe<T> {
    public readonly value: null = null;

    public constructor() {
        super(null);
    }
}

const naught: Nil<unknown> = new Nil<unknown>();

export function nil<T>(): Nil<T> {
    return naught as Nil<T>;
}

export function maybe<T>(value: T | undefined | null): Maybe<T> {
    if (isUndefined(value)) {
        return nothing();
    }
    if (isNull(value)) {
        return nil();
    }
    return just(value);
}

export function nullable<T>(value: T | null): Maybe<T> {
    if (isNull(value)) {
        return nil();
    }
    return just(value);
}

export function optional<T>(value?: T): Maybe<T> {
    if (isUndefined(value)) {
        return nothing();
    }
    return just(value);
}

/**
 * @package
 */
export function maybeOf<T>(value: Maybe<T> | T | undefined | null): Maybe<T> {
    if (value instanceof Maybe) {
        return value;
    }
    return maybe(value);
}

/**
 * @package
 */
export function fallbackTo<T>(fallback: Fallback<T>): T {
    if (fallback instanceof Function) {
        return fallback();
    }
    return fallback;
}
