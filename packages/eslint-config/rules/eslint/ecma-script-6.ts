export = {
    rules: {
        'arrow-body-style': ['warn', 'never'],
        'arrow-parens': ['warn', 'as-needed'],
        'arrow-spacing': ['warn', {
            before: true,
            after: true,
        }],
        'constructor-super': 'error',
        'generator-star-spacing': ['warn', {
            before: true,
            after: false,
        }],
        'no-class-assign': 'error',
        'no-confusing-arrow': ['warn', {
            allowParens: true,
        }],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': ['error', {
            includeExports: true,
        }],
        'no-new-symbol': 'error',
        'no-restricted-exports': 'off',
        'no-restricted-imports': 'error',
        'no-this-before-super': 'error',
        'no-useless-computed-key': 'warn',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'warn',
        'no-var': 'warn',
        'object-shorthand': ['warn', 'always'],
        'prefer-arrow-callback': 'warn',
        'prefer-const': 'warn',
        'prefer-destructuring': ['warn', {
            object: false,
            array: false,
        }],
        'prefer-numeric-literals': 'warn',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'warn',
        'require-yield': 'error',
        'rest-spread-spacing': ['warn', 'never'],
        'sort-imports': 'off',
        'symbol-description': 'error',
        'template-curly-spacing': ['warn', 'never'],
        'yield-star-spacing': ['warn', {
            before: true,
            after: false,
        }],
    },
};