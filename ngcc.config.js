module.exports = {
  packages: {
    "@nativescript/angular": {
      entryPoints: {
        ".": {
          override: {
            main: "./index.js",
            typings: "./index.d.ts",
          },
          ignoreMissingDependencies: true,
        }
      },
      ignorableDeepImportMatchers: [
        /tns-core-modules\//,
        /@nativescript\/core\//,
      ]
    },
    "nativescript-ui-chart": {
      entryPoints: {
        "angular": {
          override: {
            main: "./chart-directives.js",
            typings: "./chart-directives.d.ts",
          },
          ignoreMissingDependencies: true,
        }
      },
      ignorableDeepImportMatchers: [
        /tns-core-modules\//,
        /@nativescript\/core\//,
        /@nativescript\/angular\//
      ]
    }
  }
};