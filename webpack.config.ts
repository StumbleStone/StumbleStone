import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Configuration = WebpackConfiguration & {
  devServer?: DevServerConfiguration;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appNodeModules = path.resolve(__dirname, "node_modules");

function resolveAppPackage(packageName: string): string {
  return fs.realpathSync(path.resolve(appNodeModules, packageName));
}

function readEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce<Record<string, string>>((env, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return env;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^['"]|['"]$/g, "");

      env[key] = value;
      return env;
    }, {});
}

function readEnv(): Record<string, string> {
  const processEnv: Record<string, string> = {};

  for (const [key, value] of Object.entries({
    PUBLIC_PATH: process.env.PUBLIC_PATH,
    DEV_SERVER_HOST: process.env.DEV_SERVER_HOST,
    DEV_SERVER_PORT: process.env.DEV_SERVER_PORT,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  })) {
    if (value != null) {
      processEnv[key] = value;
    }
  }

  return {
    ...readEnvFile(path.resolve(__dirname, ".env")),
    ...readEnvFile(path.resolve(__dirname, ".env.local")),
    ...processEnv,
  };
}

const config = (_env: unknown, argv: { mode?: string } = {}): Configuration => {
  const env = readEnv();
  const isProduction = argv.mode === "production";
  const basePath = (env.PUBLIC_PATH || "").replace(/^\/+|\/+$/g, "");
  const publicPath = isProduction && basePath ? `/${basePath}/` : "/";
  const devServerPort = Number.parseInt(env.DEV_SERVER_PORT || "3000", 10);

  return {
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction
        ? "assets/[name].[contenthash:8].js"
        : "assets/[name].js",
      publicPath,
      clean: true,
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: [appNodeModules, "node_modules"],
      alias: {
        // Force linked local packages to share the app's runtime singletons.
        react: resolveAppPackage("react"),
        "react-dom": resolveAppPackage("react-dom"),
        "@emotion/react": resolveAppPackage("@emotion/react"),
        "@emotion/styled": resolveAppPackage("@emotion/styled"),
        "react-router-dom": resolveAppPackage("react-router-dom"),
        // Bookinator 1.0.0's wildcard export maps this directory import to
        // dist/Settings.js instead of the published directory index.
        "@stumblestone/project-bookinator/Settings$": path.resolve(
          resolveAppPackage("@stumblestone/project-bookinator"),
          "dist/Settings/index.js",
        ),
      },
    },
    devServer: {
      host: env.DEV_SERVER_HOST || "127.0.0.1",
      port: Number.isFinite(devServerPort) ? devServerPort : 3000,
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, "public"),
      },
    },
    module: {
      rules: [
        {
          // Refdown's published ESM currently uses extensionless relative imports.
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new webpack.DefinePlugin({
        __SUPABASE_URL__: JSON.stringify(env.SUPABASE_URL || ""),
        __SUPABASE_PUBLISHABLE_KEY__: JSON.stringify(
          env.SUPABASE_PUBLISHABLE_KEY || "",
        ),
      }),
    ],
  };
};

export default config;
