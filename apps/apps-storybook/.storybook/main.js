const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    stories: ["../stories/**/*.@(story|stories).@(js|jsx|ts|tsx|mdx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-styling-webpack"],
    staticDirs: ["../static"],
    framework: "@storybook/react-webpack5",
    babel: (config) => {
        config.presets.push(["@babel/preset-typescript", { isTSX: true, allExtensions: true }]);
        return config;
    },
};
