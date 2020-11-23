import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "buicafe-api",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-dotenv-plugin", "serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    app: {
      handler: "src/index.hello",
      events: [
        {
          http: {
            path: "/api",
            method: "ANY",
          },
        },
        {
          http: {
            path: "/api/{proxy+}",
            method: "ANY",
          },
        },
      ],
      // layers: ["NodeModulesLambdaLayer"],
    },
  }
};

module.exports = serverlessConfiguration;
