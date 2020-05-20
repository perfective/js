import { Predicate } from '@perfective/fp';

export function isEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable === value;
}

export function isNotEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable !== value;
}

export function isGreaterThan(value: number): Predicate<number> {
    return (variable: number): boolean => variable > value;
}

export function isGreaterThanOrEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable >= value;
}

export function isLessThan(value: number): Predicate<number> {
    return (variable: number): boolean => variable < value;
}

export function isLessThanOrEqualTo(value: number): Predicate<number> {
    return (variable: number): boolean => variable <= value;
}
