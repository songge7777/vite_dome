import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias:{
      "@": pathResolve("src")
    }
  },
  plugins: [reactRefresh()]
});
