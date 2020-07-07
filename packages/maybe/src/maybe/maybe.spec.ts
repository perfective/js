import { panic } from '@perfective/error';
import { constant } from '@perfective/fp';
import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
} from '@perfective/object';
import { decimal, isGreaterThan, isLessThan } from '@perfective/real';
import { isDefined, isNotNull, isNull, isPresent, isUndefined } from '@perfective/value';

import { Just, Maybe, just, maybe, nil, nothing, nullable, optional } from './maybe';

function justDecimal(value: number): Just<string> {
    return just(value).to<string>(decimal);
}

function maybeSplit(value: string): Maybe<string[]> {
    return just(value.split('.'));
}

interface Boxed<T> {
    readonly value?: T | null | undefined;
}

interface TypeGuardCheck<T> {
    readonly required: T;
    readonly optional?: T;
    readonly option: T | undefined;
    readonly nullable: T | null;
    readonly maybe: T | null | undefined;
    readonly possible?: T | null | undefined;
}

const check: TypeGuardCheck<number> = {
    required: 3.14,
    option: undefined,
    nullable: 0,
    maybe: 2.71,
    possible: null,
};

describe('maybe', () => {
    it('equals just() when value is present', () => {
        expect(maybe(3.14))
            .toStrictEqual(just(3.14));
    });

    it('equals nothing() when value is undefined', () => {
        expect(maybe<number>(undefined))
            .toStrictEqual(nothing());
    });

    it('equals nil() when value is null', () => {
        expect(maybe<number>(null))
            .toStrictEqual(nil());
    });
});

describe('optional', () => {
    it('equals just() when value is present', () => {
        expect(optional(3.14))
            .toStrictEqual(just(3.14));
    });

    it('equals nothing() when value is undefined', () => {
        expect(optional<number>(undefined))
            .toStrictEqual(nothing());
    });
});

describe('nullable', () => {
    it('equals just() when value is present', () => {
        expect(nullable(3.14))
            .toStrictEqual(just(3.14));
    });

    it('equals nil() when value is null', () => {
        expect(nullable<number>(null))
            .toStrictEqual(nil());
    });
});

describe('just', () => {
    describe('value', () => {
        it('is a required value', () => {
            expect(just<number>(3.14).value)
                .toStrictEqual(3.14);
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law', () => {
            expect(just(3.14).onto(justDecimal))
                .toStrictEqual(justDecimal(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(just(3.14).onto(maybe))
                .toStrictEqual(just(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(just(3.14).onto(x => justDecimal(x).onto(maybeSplit)))
                .toStrictEqual(just(3.14).onto(justDecimal).onto(maybeSplit));
        });

        it('keeps context of Just when all binds are defined', () => {
            expect(just(3.14).onto(pi => just(-pi)).onto(justDecimal))
                .toStrictEqual(just('-3.14'));
        });
    });

    describe('to', () => {
        it('returns Just next value when the bind function returns a present value', () => {
            expect(just(3.14).to<string>(decimal))
                .toStrictEqual(just(decimal(3.14)));
        });

        it('returns Nothing when the bind function returns undefined', () => {
            expect(just(3.14).to(() => undefined))
                .toStrictEqual(nothing());
        });

        it('returns Nil when the bind function returns null', () => {
            expect(just(3.14).to(() => null))
                .toStrictEqual(nil());
        });

        it('keeps context of Just when all types are defined and not null', () => {
            expect(just(3.14).to(pi => -pi))
                .toStrictEqual(just(-3.14));
            expect(just(3.14).to((): number => 2.71).value.toString(10))
                .toStrictEqual('2.71');
            expect(just(3.14).to<string>(decimal).value.split('.'))
                .toStrictEqual(['3', '14']);
        });
    });

    describe('that', () => {
        it('keeps the value when condition holds', () => {
            expect(just(3.14).that(isGreaterThan(2.71)))
                .toStrictEqual(just(3.14));
        });

        it('filters out the value when condition fails', () => {
            expect(just(3.14).that(isLessThan(2.71)))
                .toStrictEqual(nothing());
        });
    });

    describe('which', () => {
        it('returns just() when value passes the type guard', () => {
            expect(just(check).which(hasDefinedProperty('required')))
                .toStrictEqual(just(check));
            expect(just(check).which(hasUndefinedProperty('optional')))
                .toStrictEqual(just(check));
            expect(just(check).which(hasNotNullProperty('nullable')))
                .toStrictEqual(just(check));
            expect(just(check).which(hasNullProperty('possible')))
                .toStrictEqual(just(check));
            expect(just(check).which(hasPresentProperty('maybe')))
                .toStrictEqual(just(check));
            expect(just(check).which(hasAbsentProperty('option')))
                .toStrictEqual(just(check));
        });

        it('returns nothing() when value fails the type guard', () => {
            expect(just(check).which(hasUndefinedProperty('required')))
                .toStrictEqual(nothing());
            expect(just(check).which(hasDefinedProperty('optional')))
                .toStrictEqual(nothing());
            expect(just(check).which(hasNullProperty('nullable')))
                .toStrictEqual(nothing());
            expect(just(check).which(hasNotNullProperty('possible')))
                .toStrictEqual(nothing());
            expect(just(check).which(hasAbsentProperty('maybe')))
                .toStrictEqual(nothing());
            expect(just(check).which(hasPresentProperty('option')))
                .toStrictEqual(nothing());
        });

        it('combines checked properties', () => {
            expect(
                just(check)
                    .which(hasDefinedProperty('required'))
                    .which(hasDefinedProperty('option'))
                    .to(v => `${decimal(v.required)}:${decimal(v.option)}`),
            ).toStrictEqual(
                just(check)
                    .which(hasDefinedProperty('required', 'option'))
                    .to(v => `${decimal(v.required)}:${decimal(v.option)}`),
            );
        });
    });

    describe('when', () => {
        it('keeps the value when an outside condition holds', () => {
            expect(just(3.14).when(true))
                .toStrictEqual(just(3.14));
            expect(just(3.14).when(() => true))
                .toStrictEqual(just(3.14));
        });

        it('filters out the value when an outside condition fails', () => {
            expect(just(3.14).when(false))
                .toStrictEqual(nothing());
            expect(just(3.14).when(() => false))
                .toStrictEqual(nothing());
        });
    });

    describe('pick', () => {
        it('returns an existing property from an object', () => {
            const boxed: Boxed<number> = { value: 3.14 };

            expect(just(boxed).pick('value'))
                .toStrictEqual(just(3.14));
            expect(just(boxed).pick(() => 'value'))
                .toStrictEqual(just(3.14));
            expect(just(boxed).pick(constant<keyof Boxed<number>>('value')))
                .toStrictEqual(just(3.14));
        });

        it('returns nothing for a missing property from an object', () => {
            const value: Boxed<number> = {};

            expect(just(value).pick('value'))
                .toStrictEqual(nothing());
            expect(just(value).pick(() => 'value'))
                .toStrictEqual(nothing());
            expect(just(value).pick(constant<keyof Boxed<number>>('value')))
                .toStrictEqual(nothing());
        });

        it('is an equivalent of the then() chain', () => {
            const boxed: Boxed<Boxed<number>> = {
                value: {
                    value: 3.14,
                },
            };

            expect(
                just(boxed)
                    .pick('value')
                    .pick(() => 'value')
                    .to<string>(decimal),
            ).toStrictEqual(
                just(boxed)
                    .to(b => b.value)
                    .to(v => v.value)
                    .to(v => v.toString(10)),
            );
        });
    });

    describe('otherwise', () => {
        it('returns the Maybe value when fallback is constant', () => {
            expect(just(3.14).otherwise(2.71))
                .toStrictEqual(just(3.14));
        });

        it('returns the Maybe value when fallback is a callback', () => {
            expect(just(3.14).otherwise(constant(2.71)))
                .toStrictEqual(just(3.14));
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).otherwise(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns the Maybe value when fallback is constant', () => {
            expect(just(3.14).or(2.71))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is a function', () => {
            expect(just(3.14).or(constant(2.71)))
                .toStrictEqual(3.14);
            expect(just(3.14).or((): number | null | undefined => 2.71))
                .toStrictEqual(3.14);
            expect(just(3.14).or((): number | null => 2.71))
                .toStrictEqual(3.14);
            expect(just(3.14).or((): number | undefined => 2.71))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is null', () => {
            expect(just(3.14).or(null))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is a function returning null', () => {
            expect(just(3.14).or((): null | undefined => null))
                .toStrictEqual(3.14);
            expect(just(3.14).or((): null => null))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is undefined', () => {
            expect(just(3.14).or(undefined))
                .toStrictEqual(3.14);
        });

        it('returns the Maybe value when fallback is a function returning undefined', () => {
            expect(just(3.14).or(() => undefined))
                .toStrictEqual(3.14);
        });

        it('does not throw an error', () => {
            expect(() => just(3.14).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });

        it('is interchangeable with Maybe.otherwise().value', () => {
            expect(just(3.14).or(2.71))
                .toStrictEqual(just(3.14).otherwise(2.71).value);
            expect(just(3.14).or(constant(2.71)))
                .toStrictEqual(just(3.14).otherwise(constant(2.71)).value);
        });
    });

    describe('run', () => {
        let a = 2.71;

        it('keeps the present value the same', () => {
            // eslint-disable-next-line no-return-assign -- testing a procedure
            expect(just(3.14).run(pi => a = pi))
                .toStrictEqual(just(3.14));
        });

        it('runs a procedure on the present value', () => {
            expect(a).toStrictEqual(3.14);
        });
    });

    describe('lift', () => {
        it('applies the function to the plain monadic value', () => {
            expect(just(3.14).lift(isPresent))
                .toStrictEqual(just(true));
        });
    });
});

describe('nothing', () => {
    describe('value', () => {
        it('is an undefined value', () => {
            expect(nothing<number>().value)
                .toBeUndefined();
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nothing<number>().onto(justDecimal))
                .toStrictEqual(nothing());
        });

        it('satisfies right identity monad law', () => {
            expect(nothing<number>().onto(maybe))
                .toStrictEqual(nothing());
        });

        it('satisfies associativity monad law', () => {
            expect(nothing<number>().onto(x => justDecimal(x).onto(maybeSplit)))
                .toStrictEqual(nothing<number>().onto(justDecimal).onto(maybeSplit));
        });
    });

    describe('to', () => {
        it('skips the mapping function', () => {
            expect(nothing<number>().to<string>(decimal))
                .toStrictEqual(nothing());
        });
    });

    describe('that', () => {
        it('remains nothing when condition holds', () => {
            expect(nothing<number>().that(isUndefined))
                .toStrictEqual(nothing());
        });

        it('remains nothing when condition fails', () => {
            expect(nothing<number>().that(isDefined))
                .toStrictEqual(nothing());
        });
    });

    describe('which', () => {
        it('remains nothing() after value is checked by the type guard', () => {
            expect(nothing<TypeGuardCheck<number>>().which(hasPresentProperty('maybe')))
                .toStrictEqual(nothing());
        });
    });

    describe('when', () => {
        it('remains nothing when an outside condition holds', () => {
            expect(nothing().when(true))
                .toStrictEqual(nothing());
            expect(nothing().when(() => true))
                .toStrictEqual(nothing());
        });

        it('remains nothing when an outside condition fails', () => {
            expect(nothing().when(false))
                .toStrictEqual(nothing());
            expect(nothing().when(() => false))
                .toStrictEqual(nothing());
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            expect(
                nothing<Boxed<Boxed<number>>>()
                    .pick('value')
                    .pick(() => 'value')
                    .to<string>(decimal),
            ).toStrictEqual(
                nothing<Boxed<Boxed<number>>>()
                    .to(b => b.value)
                    .to(v => v.value)
                    .to<string>(decimal),
            );
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing<number>().otherwise(2.71))
                .toStrictEqual(just(2.71));
        });

        it('returns a result of the fallback callback', () => {
            expect(nothing<number>().otherwise(constant(2.71)))
                .toStrictEqual(just(2.71));
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().otherwise(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nothing<number>().or(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback when fallback is a function', () => {
            expect(nothing<number>().or(constant(2.71)))
                .toStrictEqual(2.71);
            expect(nothing<number>().or((): number | null | undefined => 2.71))
                .toStrictEqual(2.71);
            expect(nothing<number>().or((): number | null => 2.71))
                .toStrictEqual(2.71);
            expect(nothing<number>().or((): number | undefined => 2.71))
                .toStrictEqual(2.71);
        });

        it('returns null when fallback is null', () => {
            expect(nothing<number>().or(null))
                .toBeNull();
        });

        it('returns null when fallback is a function returning null', () => {
            expect(nothing<number>().or((): null | undefined => null))
                .toBeNull();
            expect(nothing<number>().or((): null => null))
                .toBeNull();
        });

        it('returns undefined when fallback is undefined', () => {
            expect(nothing<number>().or(undefined))
                .toBeUndefined();
        });

        it('returns undefined when fallback is a function returning undefined', () => {
            expect(nothing<number>().or(undefined))
                .toBeUndefined();
        });

        it('allows to throw an error', () => {
            expect(() => nothing<number>().or(panic('Value is not present')))
                .toThrow('Value is not present');
        });

        it('is interchangeable with Maybe.otherwise().value', () => {
            expect(nothing<number>().or(2.71))
                .toStrictEqual(nothing<number>().otherwise(2.71).value);
        });
    });

    describe('run', () => {
        let a = 2.71;

        it('keeps nothing the same', () => {
            // eslint-disable-next-line no-return-assign -- testing a procedure
            expect(nothing<number>().run(none => a = none))
                .toStrictEqual(nothing());
        });

        it('skips running the procedure on nothing', () => {
            expect(a).toStrictEqual(2.71);
        });
    });

    describe('lift', () => {
        it('applies the function to the plain monadic value', () => {
            expect(nothing().lift(isUndefined))
                .toStrictEqual(just(true));
        });
    });
});

describe('nil', () => {
    describe('value', () => {
        it('is a null value', () => {
            expect(nil<number>().value)
                .toBeNull();
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law for an undefined value', () => {
            expect(nil<number>().onto(justDecimal))
                .toStrictEqual(nil());
        });

        it('satisfies right identity monad law', () => {
            expect(nil<number>().onto(maybe))
                .toStrictEqual(nil());
        });

        it('satisfies associativity monad law', () => {
            expect(nil<number>().onto(x => justDecimal(x).onto(maybeSplit)))
                .toStrictEqual(nil<number>().onto(justDecimal).onto(maybeSplit));
        });
    });

    describe('to', () => {
        it('skips the mapping function', () => {
            expect(nil<number>().to<string>(decimal))
                .toStrictEqual(nil());
        });
    });

    describe('that', () => {
        it('remains nil when condition holds', () => {
            expect(nil<number>().that(isNull))
                .toStrictEqual(nil());
        });

        it('remains nil when condition fails', () => {
            expect(nil<number>().that(isNotNull))
                .toStrictEqual(nil());
        });
    });

    describe('which', () => {
        it('remains nothing() after value is checked by the type guard', () => {
            expect(nil<TypeGuardCheck<number>>().which(hasPresentProperty('maybe')))
                .toStrictEqual(nil());
        });
    });

    describe('when', () => {
        it('remains nil when an outside condition holds', () => {
            expect(nil().when(true))
                .toStrictEqual(nil());
            expect(nil().when(() => true))
                .toStrictEqual(nil());
        });

        it('remains nil when an outside condition fails', () => {
            expect(nil().when(false))
                .toStrictEqual(nil());
            expect(nil().when(() => false))
                .toStrictEqual(nil());
        });
    });

    describe('pick', () => {
        it('returns nothing for a property from on a missing object', () => {
            expect(
                nil<Boxed<Boxed<number>>>()
                    .pick('value')
                    .pick(() => 'value')
                    .to<string>(decimal),
            ).toStrictEqual(
                nil<Boxed<Boxed<number>>>()
                    .to(b => b.value)
                    .to(v => v.value)
                    .to<string>(decimal),
            );
        });
    });

    describe('otherwise', () => {
        it('returns a fallback value when fallback is a constant', () => {
            expect(nil<number>().otherwise(2.71))
                .toStrictEqual(just(2.71));
        });

        it('returns a result of the fallback callback', () => {
            expect(nil<number>().otherwise(constant(2.71)))
                .toStrictEqual(just(2.71));
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().otherwise(panic('Value is not present')))
                .toThrow('Value is not present');
        });
    });

    describe('or', () => {
        it('returns a fallback value when fallback is constant', () => {
            expect(nil<number>().or(2.71))
                .toStrictEqual(2.71);
        });

        it('returns a result of the fallback when fallback is a function', () => {
            expect(nil<number>().or(constant(2.71)))
                .toStrictEqual(2.71);
            expect(nil<number>().or((): number | null | undefined => 2.71))
                .toStrictEqual(2.71);
            expect(nil<number>().or((): number | null => 2.71))
                .toStrictEqual(2.71);
            expect(nil<number>().or((): number | undefined => 2.71))
                .toStrictEqual(2.71);
        });

        it('returns null when fallback is null', () => {
            expect(nil<number>().or(null))
                .toBeNull();
        });

        it('returns null when fallback is a function returning null', () => {
            expect(nil<number>().or((): null | undefined => null))
                .toBeNull();
            expect(nil<number>().or((): null => null))
                .toBeNull();
        });

        it('returns undefined when fallback is undefined', () => {
            expect(nil<number>().or(undefined))
                .toBeUndefined();
        });

        it('returns undefined when fallback is a function returning undefined', () => {
            expect(nil<number>().or(undefined))
                .toBeUndefined();
        });

        it('allows to throw an error', () => {
            expect(() => nil<number>().or(panic('Value is not present')))
                .toThrow('Value is not present');
        });

        it('is interchangeable with otherwise().value', () => {
            expect(nil<number>().or(2.71))
                .toStrictEqual(nil<number>().otherwise(2.71).value);
        });
    });

    describe('run', () => {
        let a = 2.71;

        it('keeps nil the same', () => {
            // eslint-disable-next-line no-return-assign -- testing a procedure
            expect(nil<number>().run(none => a = none))
                .toStrictEqual(nil());
        });

        it('skips running the procedure on nil', () => {
            expect(a).toStrictEqual(2.71);
        });
    });

    describe('lift', () => {
        it('applies the function to the plain monadic value', () => {
            expect(nil().lift(isNull))
                .toStrictEqual(just(true));
        });
    });
});
