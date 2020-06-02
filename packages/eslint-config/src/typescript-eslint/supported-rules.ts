export = {
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': ['error', {
            default: 'array',
            readonly: 'array',
        }],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/class-literal-property-style': 'off',
        '@typescript-eslint/consistent-type-assertions': ['error', {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
        }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        }],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: true,
            },
        }],
        '@typescript-eslint/member-ordering': ['error', {
            default: [
                'signature',
                'public-static-field',
                'public-abstract-field',
                'public-decorated-field',
                'public-instance-field',
                'protected-static-field',
                'protected-abstract-field',
                'protected-decorated-field',
                'protected-instance-field',
                'private-static-field',
                'private-abstract-field',
                'private-decorated-field',
                'private-instance-field',
                'field',
                'constructor',
                'public-static-method',
                'public-abstract-method',
                'public-decorated-method',
                'public-instance-method',
                'protected-static-method',
                'protected-abstract-method',
                'protected-decorated-method',
                'protected-instance-method',
                'private-static-method',
                'private-abstract-method',
                'private-decorated-method',
                'private-instance-method',
                'method',
            ],
        }],
        // TODO: master
        '@typescript-eslint/method-signature-style': 'off',
        '@typescript-eslint/naming-convention': ['error', {
            selector: 'enumMember',
            format: ['StrictPascalCase'],
        }, {
            selector: 'variableLike',
            format: ['strictCamelCase'],
        }, {
            selector: 'memberLike',
            format: ['strictCamelCase'],
        }, {
            selector: 'typeLike',
            format: ['StrictPascalCase'],
        }],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-interface': ['error', {
            allowSingleExtends: true,
        }],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-invalid-void-type': ['error', {
            allowInGenericTypeArguments: false,
        }],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unused-vars-experimental': ['error', {
            ignoreArgsIfArgsAfterAreUsed: true,
        }],
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        // Rule behavior is unpredictable and 3rd-party libraries may not provide read-only types
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: false,
            allowBoolean: false,
            allowAny: false,
            allowNullish: false,
        }],
        '@typescript-eslint/strict-boolean-expressions': ['error', {
            allowString: false,
            allowNumber: false,
            allowNullableObject: true,
            allowNullableBoolean: false,
            allowNullableString: false,
            allowNullableNumber: false,
            allowAny: false,
        }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'never',
            lib: 'never',
        }],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/typedef': ['error', {
            arrowParameter: false,
        }],
        '@typescript-eslint/unbound-method': 'error',
        '@typescript-eslint/unified-signatures': 'error',
    },
};
