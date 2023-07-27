/*
 * @FileDescription:
 * @Author: weipeng11132@navinfo.com
 * @Date: 2023-07-26 16:24:14
 * @LastEditors: weipeng11132@navinfo.com
 * @LastEditTime: 2023-07-27 10:17:37
 * @FilePath: \vite-plugin-build-info-html\rollup.config.js
 */
import terser from "@rollup/plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: ["src/index.js"],
  output: [
    {
      dir: "dist",
      entryFileNames: '[name].mjs',
      format: "esm",
    },
    {
      dir: "dist",
      entryFileNames: '[name].cjs',
      format: "cjs",
    },
  ],
  plugins: [
    commonjs(),
    cleanup(),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        keep_infinity: true,
      },
    }),
    resolve(),
  ],
};
