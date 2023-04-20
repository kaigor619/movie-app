import { defineConfig } from "cypress";

export default defineConfig({
  screenshotsFolder: "./cypress/snapshots/actual",
  trashAssetsBeforeRuns: true,
  video: false,

  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      webpackConfig: {
        devServer: {
          port: 4000,
        },
      },
    },
  },
});
