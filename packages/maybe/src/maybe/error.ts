import { Nullary } from './maybe';

export function fail(message?: string): Nullary<never> {
    // Arrow-body-style does not recognize immediate throw
    // eslint-disable-next-line arrow-body-style
    return (): never => {
        throw new Error(message);
    };
}

export function panic<E extends Error>(error: E): Nullary<never> {
    // Arrow-body-style does not recognize immediate throw
    // eslint-disable-next-line arrow-body-style
    return (): never => {
        // @typescript-eslint/no-throw-literal rule fails without type casting
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error as Error;
    };
}