module.exports = {
    ignorePatterns: [
        "node_modules/*",
        "**/node_modules/*",
        "**/dist/*",
        "package-lock.json",
        "**/*.snap",
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.css"
    ],

    env: {
        browser: true,
        es2021: true,
        node: true
    },

    extends: ["plugin:prettier/recommended"],

    overrides: [
        {
            extends: [
                "airbnb",
                "airbnb-typescript",
                "plugin:react/recommended",
                "plugin:prettier/recommended",
                "plugin:i18next/recommended"
            ],

            env: {
                node: true
            },

            files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: ["./tsconfig.eslint.json"]
            },

            rules: {
                "prettier/prettier": "error",
                "no-plusplus": 0,
                "import/prefer-default-export": 0,
                "import/no-extraneous-dependencies": 0,
                "react/function-component-definition": [
                    2,
                    { namedComponents: "arrow-function", unnamedComponents: "arrow-function" }
                ],
                "react/require-default-props": 0
            }
        },
        {
            extends: ["plugin:jsonc/recommended-with-jsonc"],
            files: ["*.json", "*.json5", "*.jsonc"],
            parser: "jsonc-eslint-parser",
            rules: {
                "prettier/prettier": "error",
                "jsonc/sort-keys": "error"
            }
        },
        {
            extends: ["plugin:jsonc/recommended-with-jsonc"],
            files: ["package.json", "package-lock.json"],
            parser: "jsonc-eslint-parser",
            rules: {
                "prettier/prettier": "error",
                "jsonc/sort-keys": "off"
            }
        },
        {
            files: ["*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx"],

            rules: {
                "i18next/no-literal-string": 0
            }
        }
    ],
    plugins: ["react"],
    settings: {
        react: {
            version: "detect"
        }
    }
};
