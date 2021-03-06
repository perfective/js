import { error, errorOutput, isError, isNotError, stack } from './error';

describe('error', () => {
    it('creates a new Error with a message', () => {
        expect(error('Exception'))
            .toStrictEqual(new Error('Exception'));
    });
});

describe('isError', () => {
    it('returns true when value is an Error', () => {
        expect(isError(new Error('Error')))
            .toBe(true);
    });

    it('returns false when value is not an Error', () => {
        expect(isError('Error'))
            .toBe(false);
    });
});

describe('isNotError', () => {
    it('returns false when value is an Error', () => {
        expect(isNotError(new Error('Error')))
            .toBe(false);
    });

    it('returns true when value is not an Error', () => {
        expect(isNotError('Error'))
            .toBe(true);
    });
});

describe('errorOutput', () => {
    it('returns only error name when message is undefined', () => {
        // eslint-disable-next-line unicorn/error-message -- testing undefined message
        expect(errorOutput(new ReferenceError()))
            .toStrictEqual('ReferenceError');
    });

    it('returns human-readable string matching Error.toString() on Node.js', () => {
        expect(errorOutput(new Error('Failure!')))
            .toStrictEqual('Error: Failure!');
        expect(errorOutput(new TypeError('Invalid type')))
            .toStrictEqual('TypeError: Invalid type');
    });
});

describe('errorStack', () => {
    it('returns stack when Error.stack property present', () => {
        const error: Error = new Error('Stack');

        expect(stack(error))
            .toMatch('Error: Stack\n    at Object.<anonymous>');
    });

    it('returns message with "at <unknown>" stack, when Error.stack property is undefined', () => {
        const error: Error = new Error('No Stack');
        error.stack = undefined;

        expect(stack(error))
            .toStrictEqual('No Stack\n    at <unknown>');
    });
});
