import { isNotRangeError, isRangeError, rangeError } from './range-error';

describe('rangeError', () => {
    it('creates a new RangeError with a message', () => {
        expect(rangeError('Exception'))
            .toStrictEqual(new RangeError('Exception'));
    });
});

describe('isRangeError', () => {
    it('returns true when value is an RangeError', () => {
        expect(isRangeError(new RangeError('Error')))
            .toBe(true);
    });

    it('returns false when value is not an RangeError', () => {
        expect(isRangeError('RangeError'))
            .toBe(false);
    });
});

describe('isNotRangeError', () => {
    it('returns false when value is an RangeError', () => {
        expect(isNotRangeError(new RangeError('Error')))
            .toBe(false);
    });

    it('returns true when value is not an RangeError', () => {
        expect(isNotRangeError('RangeError'))
            .toBe(true);
    });
});
