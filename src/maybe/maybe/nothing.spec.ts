import { panic } from '../../error/panic/panic';
import { constant, Nullary } from '../../fp/function/nullary';
import { hasPresentProperty, ObjectWithPresent } from '../../object/property/property';
import { decimal } from '../../real/number/base';
import { isUndefined } from '../../value/value/type-guard';

import { Just, just, Maybe, maybe, naught, Nothing, nothing } from './maybe';
import { Boxed, fallbackMaybe } from './maybe.mock';
import { TypeGuardCheck } from './type-guard-check.mock';

describe(nothing, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = nothing<number>();

        expect(output).toBe(nothing());
    });

    it('cannot be assigned to Just<T>', () => {
        // TS2322: Type 'Nothing<number>' is not assignable to type 'Just<number>'.
        // @ts-expect-error -- Just is not Nothing.
        const output: Just<number> = nothing();

        expect(output).toBe(nothing());
    });

    it('throws an error if instantiated with a present value', () => {
        // @ts-expect-error -- testing a highly unlikely case of direct instantiation with a present value.
        expect(() => new Nothing(3.14)).toThrow('Nothing value must be absent');
    });
});

describe(naught, () => {
    it('can be assigned to Maybe<T>', () => {
        const output: Maybe<number> = naught<number>();

        expect(output).toBe(naught());
    });

    it('cannot be assigned to Just<T>', () => {
        // TS2322: Type 'Nothing<number>' is not assignable to type 'Just<number>'.
        // @ts-expect-error -- Just is not Nothing.
        const output: Just<number> = naught<number>();

        expect(output).toBe(naught());
    });
});

describe(Nothing, () => {
    describe('value', () => {
        it('can be undefined and cannot be assigned to the value type', () => {
            // TS2322: Type 'null | undefined' is not assignable to type 'number'.
            // @ts-expect-error -- Nothing.value has to be assigned to "null | undefined"
            const value: number = nothing<number>().value;

            expect(value).toBeUndefined();
        });

        it('can be null and cannot be assigned to the value type', () => {
            // TS2322: Type 'null | undefined' is not assignable to type 'number'.
            // @ts-expect-error -- Nothing.value has to be assigned to "null | undefined"
            const value: number = naught<number>().value;

            expect(value).toBeNull();
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Maybe', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().onto(constant(maybe(2.71)));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.onto() always returns itself (Nothing).
                const output: Just<number> = nothing<number>().onto(constant(maybe(2.71)));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().onto(constant(maybe(2.71)));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "flatMap" function returns Just', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().onto(constant(just(2.71)));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.onto() always returns itself (Nothing).
                const output: Just<number> = nothing<number>().onto(constant(just(2.71)));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().onto(constant(just(2.71)));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "flatMap" function returns Nothing', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().onto(constant(nothing<number>()));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- Nothing.onto() always returns itself (Nothing).
                const output: Just<number> = naught<number>().onto(constant(nothing<number>()));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<number>().onto(constant(nothing<number>()));

                expect(output).toBe(naught());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().to(constant('3.14'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.to() always returns itself (Nothing).
                const output: Just<string> = nothing<number>().to(constant('3.14'));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().to(constant('3.14'));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = nothing<number>().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.to() always returns itself (Nothing).
                const output: Just<string> = nothing<number>().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = nothing<number>().to(constant<string | null>(null));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<string> = naught<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.to() always returns itself (Nothing).
                const output: Just<string> = naught<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<string> = naught<number>().to(constant<string | undefined>(undefined));

                expect(output).toBe(naught());
            });
        });
    });

    describe('pick', () => {
        it('is a shortcut of the to() method', () => {
            const input: Nothing<TypeGuardCheck<Boxed<number>>> = nothing<TypeGuardCheck<Boxed<number>>>();

            expect(input.pick('required').pick('value'))
                .toStrictEqual(input.to(i => i.required).to(i => i.value));
        });

        describe('when the property is required', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<TypeGuardCheck>().pick('required');

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.pick() always returns itself (Nothing).
                const output: Just<number> = nothing<TypeGuardCheck>().pick('required');

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<TypeGuardCheck>().pick('required');

                expect(output).toBe(nothing());
            });
        });

        describe('when the property can be absent', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.pick() always returns itself (Nothing).
                const output: Just<number> = nothing<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<TypeGuardCheck>().pick('possible');

                expect(output).toBe(nothing());
            });
        });

        describe('when the property is nullable', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.pick() always returns itself (Nothing).
                const output: Just<number> = nothing<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<TypeGuardCheck>().pick('nullable');

                expect(output).toBe(nothing());
            });
        });

        describe('when the property is optional', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<TypeGuardCheck>().pick('optional');

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.pick() always returns itself (Nothing).
                const output: Just<number> = naught<TypeGuardCheck>().pick('optional');

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<TypeGuardCheck>().pick('optional');

                expect(output).toBe(naught());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().that(constant(true));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.that() always returns itself (Nothing).
                const output: Just<number> = nothing<number>().that(constant(true));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().that(constant(true));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "filter" condition is false', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().that(constant(false));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.that() always returns itself (Nothing).
                const output: Just<number> = naught<number>().that(constant(false));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<number>().that(constant(false));

                expect(output).toBe(naught());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.which() always returns itself (Nothing).
                const output: Just<number> = nothing<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().which(hasPresentProperty('toPrecision'));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.which() always returns itself (Nothing).
                const output: Just<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = naught<TypeGuardCheck>()
                    .which(hasPresentProperty('maybe'));

                expect(output).toBe(naught());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().when(constant(true));

                expect(output).toBe(nothing());
            });

            it('cannot be assigned to Just', () => {
                // @ts-expect-error -- Nothing.when() always returns itself (Nothing).
                const output: Just<number> = nothing<number>().when(constant(true));

                expect(output).toBe(nothing());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = nothing<number>().when(constant(true));

                expect(output).toBe(nothing());
            });
        });

        describe('when the "condition" is false', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().when(constant(false));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.when() always returns itself (Nothing).
                const output: Just<number> = naught<number>().when(constant(false));

                expect(output).toBe(naught());
            });

            it('returns Nothing (self)', () => {
                const output: Nothing<number> = naught<number>().when(constant(false));

                expect(output).toBe(naught());
            });
        });
    });

    describe('otherwise', () => {
        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => naught<number>().otherwise(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = nothing<number>().otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Just<number>' is not assignable to type 'Nothing<number>'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback value.
                const output: Nothing<number> = nothing<number>().otherwise(2.71);

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('returns Just with the fallback value', () => {
                const output: Just<number> = naught<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Just' is not assignable to type 'Nothing'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback and it is present.
                const output: Nothing<number> = naught<number>().otherwise(constant(2.71));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" may be an absent value', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback, but the result may be absent.
                const output: Just<number> = nothing<number>().otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback, but the result may be present.
                const output: Nothing<number> = nothing<number>().otherwise(fallbackMaybe(2.71));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned toMaybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(fallbackMaybe(2.71)));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Just<number>'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback, but the result may be absent.
                const output: Just<number> = naught<number>().otherwise(constant(fallbackMaybe(2.71)));

                expect(output).toStrictEqual(just(2.71));
            });

            it('cannot be assigned to Nothing', () => {
                // TS2322: Type 'Maybe<number>' is not assignable to type 'Nothing<number>'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback, but the result may be present.
                const output: Nothing<number> = naught<number>().otherwise(constant(fallbackMaybe(2.71)));

                expect(output).toStrictEqual(just(2.71));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(null);

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback and it is absent.
                const output: Just<number> = nothing<number>().otherwise(null);

                expect(output).toBe(naught());
            });

            it('returns naught as Nothing', () => {
                const output: Nothing<number> = nothing<number>().otherwise(null);

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback and it is absent.
                const output: Just<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(naught());
            });

            it('returns naught as Nothing', () => {
                const output: Nothing<number> = nothing<number>().otherwise(constant(null));

                expect(output).toBe(naught());
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback and it is absent.
                const output: Just<number> = naught<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<number> = naught<number>().otherwise(undefined);

                expect(output).toStrictEqual(nothing());
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Maybe', () => {
                const output: Maybe<number> = naught<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });

            it('cannot be assigned to Just', () => {
                // TS2322: Type 'Nothing' is not assignable to type 'Just'.
                // @ts-expect-error -- Nothing.otherwise() always returns the fallback and it is absent.
                const output: Just<number> = naught<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });

            it('returns nothing as Nothing', () => {
                const output: Nothing<number> = naught<number>().otherwise(constant(undefined));

                expect(output).toStrictEqual(nothing());
            });
        });
    });

    describe('or', () => {
        it('is a shortcut for Maybe.otherwise().value', () => {
            expect(nothing<number>().or(2.71))
                .toStrictEqual(nothing<number>().otherwise(2.71).value);
            expect(naught<number>().or(2.71))
                .toStrictEqual(naught<number>().otherwise(2.71).value);
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
            expect(() => naught<number>().or(panic('Value is absent')))
                .toThrow('Value is absent');
        });

        describe('when the "fallback" is present', () => {
            it('returns the given fallback value', () => {
                const output: string = nothing<string>().or('3.14');

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the result of the fallback', () => {
                const output: string = naught<string>().or(constant('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" may return an absent value', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null | undefined = nothing<string>().or(fallbackMaybe<string>('3.14'));

                expect(output).toStrictEqual('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | null | undefined' is not assignable to type 'string'.
                // @ts-expect-error -- fallback may return string, null, or undefined.
                const output: string = nothing<string>().or(fallbackMaybe<string>('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns null', () => {
                const output: null = nothing<string>().or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'null' is not assignable to type 'string'.
                // @ts-expect-error -- Nothing.or() returns the fallback, which is strictly null.
                const output: string = nothing<string>().or(null);

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns null', () => {
                const output: null = nothing<string>().or(constant(null));

                expect(output).toBeNull();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'null' is not assignable to type 'string'.
                // @ts-expect-error -- Nothing.or() returns the fallback, which is strictly null.
                const output: string = nothing<string>().or(constant(null));

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" may return null', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | null = nothing<string>().or(constant<string | null>('3.14'));

                expect(output).toStrictEqual('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | null' is not assignable to type 'string'.
                // @ts-expect-error -- fallback may return string or null.
                const output: string = nothing<string>().or(constant<string | null>('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });

        /* eslint-disable @typescript-eslint/no-confusing-void-expression -- testing the method signature */
        describe('when the "fallback" is undefined', () => {
            it('returns undefined', () => {
                const output: undefined = naught<string>().or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'undefined' is not assignable to type 'string'.
                // @ts-expect-error -- Nothing.or() returns the fallback, which is strictly undefined
                const output: string = naught<string>().or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns undefined', () => {
                const output: undefined = naught<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'undefined' is not assignable to type 'string'.
                // @ts-expect-error -- Nothing.or() returns the fallback, which is strictly undefined
                const output: string = naught<string>().or(constant(undefined));

                expect(output).toBeUndefined();
            });
        });
        /* eslint-enable @typescript-eslint/no-confusing-void-expression */

        describe('when the fallback may return undefined', () => {
            it('must be assigned to the fallback return type', () => {
                const output: string | undefined = naught<string>().or(constant<string | undefined>('3.14'));

                expect(output).toStrictEqual('3.14');
            });

            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'string | undefined' is not assignable to type 'string'.
                // @ts-expect-error -- fallback may return string or undefined.
                const output: string = naught<string>().or(constant<string | undefined>('3.14'));

                expect(output).toStrictEqual('3.14');
            });
        });
    });

    describe('run', () => {
        let pi: number = 3.14;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignPi = (value: number): Nullary<void> => (): void => {
            pi = value;
        };

        it('does not run the given procedure', () => {
            expect(pi).toStrictEqual(3.14);
            expect(nothing<number>().run(assignPi(3.1415))).toBe(nothing());
            expect(pi).toStrictEqual(3.14);
        });

        it('can be assigned to Maybe', () => {
            const output: Maybe<number> = nothing<number>().run(assignPi(3.1415));

            expect(output).toBe(nothing());
        });

        it('cannot be assigned to Just', () => {
            // @ts-expect-error -- Nothing.run() returns itself (Nothing).
            const output: Just<number> = nothing<number>().run(assignPi(3.1415));

            expect(output).toBe(nothing());
        });

        it('returns Nothing', () => {
            const output: Nothing<number> = nothing<number>().run(assignPi(3.1415));

            expect(output).toBe(nothing());
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            expect(() => {
                // TS2345: Argument of type '{ (value: number): string; (value: string): number | null; }'
                //  is not assignable to parameter of type '(value: null | undefined) => number | null | undefined'.
                // @ts-expect-error -- Nothing.lift passes null or undefined into the function.
                nothing<string>().lift(decimal);
            }).toThrow("Cannot read property 'toString' of undefined");
            expect(() => {
                // TS2345: Argument of type '{ (value: number): string; (value: string): number | null; }'
                //  is not assignable to parameter of type '(value: null | undefined) => number | null | undefined'.
                // @ts-expect-error -- Nothing.lift passes null or undefined into the function.
                naught<string>().lift(decimal);
            }).toThrow("Cannot read property 'toString' of null");
        });

        it('must be assigned to Maybe', () => {
            const output: Maybe<boolean> = nothing<number>().lift(isUndefined);

            expect(output).toStrictEqual(just(true));
        });

        it('cannot be assigned to Just', () => {
            // TS2322: Type 'Maybe<false>' is not assignable to type 'Just<boolean>'.
            // @ts-expect-error -- Nothing.lift() may return Nothing.
            const output: Just<boolean> = nothing<number>().lift(constant(false));

            expect(output).toStrictEqual(just(false));
        });

        it('cannot be assigned to Nothing', () => {
            // TS2322: Type 'Maybe<boolean>' is not assignable to type 'Nothing<boolean>'.
            // @ts-expect-error -- Nothing.lift() may return Just.
            const output: Nothing<boolean> = nothing<number>().lift<boolean>(constant(null));

            expect(output).toBe(naught());
        });
    });
});
