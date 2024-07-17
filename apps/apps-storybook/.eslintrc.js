module.exports = {
    extends: ["../../.eslintrc.js"],
    overrides: [
        {
            files: ["*.*"],
            rules: {
                "i18next/no-literal-string": 0
            }
        }
    ]
};
