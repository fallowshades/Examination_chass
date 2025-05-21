import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';
import ReactCompilerConfig from './react-compiler.config';
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
});
