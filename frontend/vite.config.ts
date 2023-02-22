import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { defineConfig, loadEnv } from "vite";

const cacheDir =
  process.env.NODE_ENV === "development"
    ? "/usr/src/app/node_modules/.vite"
    : "node_modules/.vite";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      // hmr: false,
      // host: 'true',
      proxy: {
        "/api": {
          target: "http://backend:" + env.VITE_SERVER_PORT.toString(),
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/socket": {
          target: "ws://backend:" + env.VITE_SERVER_PORT.toString(),
          ws: true,
          // changeOrigin: true,
          // secure: true,
          // rewrite: (path) => path.replace(/^\/socket/, ''),
        },
      },
      port: parseInt(env.VITE_PORT),
      cors: true,
    },
  });
};
