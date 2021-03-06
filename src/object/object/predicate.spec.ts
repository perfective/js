import { isEmpty, isFalsy, isObject, isRecord, isTruthy } from './predicate';

describe('isObject', () => {
    it('is true when the value is an plain object', () => {
        expect(isObject({}))
            .toBe(true);
    });

    it('is true when the value is an array', () => {
        expect(isObject(['a', 'b', 'c']))
            .toBe(true);
        expect(isObject(Array.from({ length: 3 })))
            .toBe(true);
    });

    it('is true when the value is a Date', () => {
        expect(isObject(new Date()))
            .toBe(true);
    });

    it('is true when the value is a RegExp', () => {
        expect(isObject(/^/u))
            .toBe(true);
    });

    it('is false when the value is undefined', () => {
        expect(isObject(undefined))
            .toBe(false);
    });

    it('is false when the value is null', () => {
        expect(isObject(null))
            .toBe(false);
    });

    it('is false when the value is boolean', () => {
        expect(isObject(false))
            .toBe(false);
        expect(isObject(true))
            .toBe(false);
    });

    it('is false when the value is a string', () => {
        expect(isObject(''))
            .toBe(false);
    });

    it('is false when the value is a number', () => {
        expect(isObject(0))
            .toBe(false);
        expect(isObject(Number.NaN))
            .toBe(false);
        expect(isObject(Number.POSITIVE_INFINITY))
            .toBe(false);
        expect(isObject(Number.NEGATIVE_INFINITY))
            .toBe(false);
    });
});

describe('isRecord', () => {
    it('is true when the value is a plain object', () => {
        expect(isRecord({}))
            .toBe(true);
        expect(isRecord({
            pi: 3.14,
            euler: 2.71,
        })).toBe(true);
    });

    it('is false when the value is not a plain object', () => {
        expect(isRecord(Object.create(null)))
            .toBe(false);
        expect(isRecord(new Date()))
            .toBe(false);
        expect(isRecord(new RegExp('', 'u')))
            .toBe(false);
    });

    it('is false when the value is an array', () => {
        expect(isRecord([]))
            .toBe(false);
    });

    it('is false when the value type is not object', () => {
        expect(isRecord(undefined))
            .toBe(false);
        expect(isRecord(null))
            .toBe(false);
        expect(isRecord(''))
            .toBe(false);
        expect(isRecord(0))
            .toBe(false);
    });
});

describe('isTruthy', () => {
    it('is false when the value is true', () => {
        expect(isTruthy(true))
            .toBe(true);
    });

    it('is true when the value is a non-empty string', () => {
        expect(isTruthy('undefined'))
            .toBe(true);
        expect(isTruthy('null'))
            .toBe(true);
        expect(isTruthy('0'))
            .toBe(true);
    });

    it('is true when the value is a non-zero number', () => {
        expect(isTruthy(Number.MAX_SAFE_INTEGER))
            .toBe(true);
        expect(isTruthy(Number.MAX_VALUE))
            .toBe(true);
        expect(isTruthy(Number.MIN_VALUE))
            .toBe(true);
        expect(isTruthy(Number.POSITIVE_INFINITY))
            .toBe(true);
        expect(isTruthy(Number.NEGATIVE_INFINITY))
            .toBe(true);
    });

    it('is false when the value is non-zero BigInt', () => {
        expect(isTruthy(BigInt(Number.MAX_SAFE_INTEGER)))
            .toBe(true);
    });

    it('is true when the value is an (empty) object', () => {
        expect(isTruthy({}))
            .toBe(true);
    });

    it('is true when the value is an (empty) array', () => {
        expect(isTruthy([]))
            .toBe(true);
    });

    it('is true when the value is an (empty) RegExp', () => {
        expect(isTruthy(new RegExp('', 'u')))
            .toBe(true);
    });

    it('is false when the value is undefined', () => {
        expect(isTruthy(undefined))
            .toBe(false);
    });

    it('is false when the value is null', () => {
        expect(isTruthy(null))
            .toBe(false);
    });

    it('is false when the value is false', () => {
        expect(isTruthy(false))
            .toBe(false);
    });

    it('is false when the value is an empty string', () => {
        expect(isTruthy(''))
            .toBe(false);
    });

    it('is false when the value is zero', () => {
        expect(isTruthy(0))
            .toBe(false);
    });

    it('is false when the value is zero BigInt', () => {
        expect(isTruthy(BigInt(0)))
            .toBe(false);
    });

    it('is false when the value is NaN', () => {
        expect(isTruthy(Number.NaN))
            .toBe(false);
    });
});

describe('isFalsy', () => {
    it('is true when the value is undefined', () => {
        expect(isFalsy(undefined))
            .toBe(true);
    });

    it('is true when the value is null', () => {
        expect(isFalsy(null))
            .toBe(true);
    });

    it('is true when the value is false', () => {
        expect(isFalsy(false))
            .toBe(true);
    });

    it('is true when the value is an empty string', () => {
        expect(isFalsy(''))
            .toBe(true);
    });

    it('is true when the value is zero', () => {
        expect(isFalsy(0))
            .toBe(true);
    });

    it('is true when the value is zero BigInt', () => {
        expect(isFalsy(BigInt(0)))
            .toBe(true);
    });

    it('is true when the value is NaN', () => {
        expect(isFalsy(Number.NaN))
            .toBe(true);
    });

    it('is false when the value is true', () => {
        expect(isFalsy(true))
            .toBe(false);
    });

    it('is false when the value is a non-empty string', () => {
        expect(isFalsy('undefined'))
            .toBe(false);
        expect(isFalsy('null'))
            .toBe(false);
        expect(isFalsy('0'))
            .toBe(false);
    });

    it('is false when the value is a non-zero number', () => {
        expect(isFalsy(Number.MAX_SAFE_INTEGER))
            .toBe(false);
        expect(isFalsy(Number.MAX_VALUE))
            .toBe(false);
        expect(isFalsy(Number.MIN_VALUE))
            .toBe(false);
        expect(isFalsy(Number.POSITIVE_INFINITY))
            .toBe(false);
        expect(isFalsy(Number.NEGATIVE_INFINITY))
            .toBe(false);
    });

    it('is false when the value is non-zero BigInt', () => {
        expect(isFalsy(BigInt(Number.MAX_SAFE_INTEGER)))
            .toBe(false);
    });

    it('is false when the value is an (empty) object', () => {
        expect(isFalsy({}))
            .toBe(false);
    });

    it('is false when the value is an (empty) array', () => {
        expect(isFalsy([]))
            .toBe(false);
    });

    it('is false when the value is an (empty) RegExp', () => {
        expect(isFalsy(new RegExp('', 'u')))
            .toBe(false);
    });
});

describe('isEmpty', () => {
    it('is true when the value is undefined', () => {
        expect(isEmpty(undefined))
            .toBe(true);
    });

    it('is true when the value is null', () => {
        expect(isEmpty(null))
            .toBe(true);
    });

    it('is true when the value is false', () => {
        expect(isEmpty(false))
            .toBe(true);
    });

    it('is true when the value is an empty string', () => {
        expect(isEmpty(null))
            .toBe(true);
    });

    it('is true when the value is a zero', () => {
        expect(isEmpty(0))
            .toBe(true);
        expect(isEmpty(BigInt(0)))
            .toBe(true);
    });

    it('is true when the value is a NaN', () => {
        expect(isEmpty(Number.NaN))
            .toBe(true);
    });

    it('is true when the value is an empty array', () => {
        expect(isEmpty([]))
            .toBe(true);
        expect(isEmpty(Array.from({ length: 0 })))
            .toBe(true);
    });

    it('is true when the value is an empty object', () => {
        expect(isEmpty({}))
            .toBe(true);
    });

    it('is true when the value is true', () => {
        expect(isEmpty(true))
            .toBe(false);
    });

    it('is false when the value is a non-empty array', () => {
        expect(isEmpty([0]))
            .toBe(false);
        expect(isEmpty(Array.from({ length: 1 })))
            .toBe(false);
    });

    it('is false when the value is a non-empty object', () => {
        expect(isEmpty(new Date()))
            .toBe(false);
        expect(isEmpty(new RegExp('', 'u')))
            .toBe(false);
    });
});
