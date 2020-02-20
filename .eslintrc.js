module.exports = {
    env: {
        node: true
    },
    parserOptions: {
        ecmaFeatures: {
            arrowFunctions: true,
            blockBindings: true,
            classes: true,
            defaultParameters: true,
            destructuring: true,
            forOf: true,
            generators: true,
            modules: true,
            objectLiteralComputedProperties: true,
            objectLiteralDuplicateProperties: true,
            objectLiteralShorthandMethods: true,
            objectLiteralShorthandProperties: true,
            regexUFlag: true,
            regexYFlag: true,
            restParams: true,
            spread: true,
            superInFunctions: true,
            templateStrings: true,
            unicodeCodePointEscapes: true,
            globalReturn: true
        },
        ecmaVersion: 8
    },
    extends: ["eslint:recommended"],
    overrides: [
        {
            files: ["*.test.js"],
            env: {
                jest: true
            }
        },
        {
            files: ["migrations/*.js"],
            rules: { "no-unused-vars": 0 }
        }
    ]
};
