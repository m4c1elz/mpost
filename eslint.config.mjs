import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const eslintConfig = [
    ...compat.config({
        plugins: ['unused-imports'],
        extends: ['next/typescript', 'next/core-web-vitals'],
        rules: {
            'react-hooks/exhaustive-deps': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        },
    }),
]

export default eslintConfig
