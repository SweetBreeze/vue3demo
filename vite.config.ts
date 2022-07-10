import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import PluginVue from "@vitejs/plugin-vue";
import ViteRestart from "vite-plugin-restart";
// 按需引入
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VitePluginCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";

import fs from "fs";
import path from "path";

const appTitle = "环境变量主题";
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    // BUG https://github.com/element-plus/element-plus/issues/4916
    const optimizeDepsElementPlusIncludes = ["element-plus/es"];
    fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
        fs.access(
            `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
            (err) => {
                if (!err) {
                    optimizeDepsElementPlusIncludes.push(
                        `element-plus/es/components/${dirname}/style/css`
                    );
                }
            }
        );
    });
    return {
        optimizeDeps: {
            include: optimizeDepsElementPlusIncludes,
        },
        plugins: [
            PluginVue(),
            ViteRestart({
                restart: ["my.config.ts"],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                dts: "types/components.d.ts",
            }),
            VitePluginCompression({
                threshold: 10240, // 超过10kb进行压缩
            }),
            AutoImport({
                dts: "types/auto-imports.d.ts",
                imports: ["vue"],
                // resolvers: [ElementPlusResolver()],
                eslintrc: {
                    enabled: true,
                },
            }),
            createHtmlPlugin({
                inject: {
                    data: {
                        title: appTitle,
                    },
                },
            }),
            visualizer(),
        ],
        resolve: {
            alias: {
                //当使用文件系统路径别名时，请始终使用绝对路径，相对路径的别名会原封不动的被使用，无法正常解析。
                "@": path.resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
                components: path.resolve(__dirname, "src/components"),
                "/#/": path.resolve(__dirname, "types"),
            },
        },
        base: "./", // 设置打包路径
        // 引入全局scss文件
        css: {
            preprocessorOptions: {
                //消除element-plus警告
                postcss: {
                    plugins: [
                        {
                            postcssPlugin: "internal:charset-removal",
                            AtRule: {
                                charset: (atRule: any) => {
                                    if (atRule.name === "charset") {
                                        atRule.remove();
                                    }
                                },
                            },
                        },
                    ],
                },
            },
        },
        build: {
            minify: "terser",
            terserOptions: {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            // 取消计算文件大小，加快打包速度
            reportCompressedSize: false,
            sourcemap: false,
            // assetsDir: 'static/img',
            rollupOptions: {
                output: {
                    chunkFileNames: "js/[name]-[hash].js",
                    entryFileNames: "js/[name]-[hash].js",
                    assetFileNames: "[ext]/[name]-[hash].[ext]",
                },
            },
            chunkSizeWarningLimit: 10000,
        },
        server: {
            port: 3001, // 设置服务启动端口号
            open: true, // 设置服务启动时是否自动打开浏览器
            cors: true, // 允许跨域

            // 设置代理，根据我们项目实际情况配置
            proxy: {
                "/api": {
                    target: "http://192.168.2.235:38050",
                    changeOrigin: true,
                    secure: false,
                    // rewrite: (path) => path.replace("/api/", "/"),
                },
            },
        },
    };
});
// export default defineConfig({
//     plugins: [
//         PluginVue(),
//         ViteRestart({
//             restart: ["my.config.ts"],
//         }),
//         Components({
//             resolvers: [ElementPlusResolver()],
//             dts: "types/components.d.ts",
//         }),
//         VitePluginCompression({
//             threshold: 10240, // 超过10kb进行压缩
//         }),
//         AutoImport({
//             dts: "types/auto-imports.d.ts",
//             imports: ["vue"],
//             // resolvers: [ElementPlusResolver()],
//             eslintrc: {
//                 enabled: true,
//             },
//         }),
//         createHtmlPlugin({
//             inject: {
//                 data: {
//                     title: appTitle,
//                 },
//             },
//         }),
//         visualizer(),
//     ],
//     resolve: {
//         alias: {
//             //当使用文件系统路径别名时，请始终使用绝对路径，相对路径的别名会原封不动的被使用，无法正常解析。
//             "@": path.resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
//             components: path.resolve(__dirname, "src/components"),
//             "/#/": path.resolve(__dirname, "types"),
//         },
//     },
//     base: "./", // 设置打包路径
//     // 引入全局scss文件
//     css: {
//         preprocessorOptions: {
//             //消除element-plus警告
//             postcss: {
//                 plugins: [
//                     {
//                         postcssPlugin: "internal:charset-removal",
//                         AtRule: {
//                             charset: (atRule: any) => {
//                                 if (atRule.name === "charset") {
//                                     atRule.remove();
//                                 }
//                             },
//                         },
//                     },
//                 ],
//             },
//         },
//     },
//     build: {
//         minify: "terser",
//         terserOptions: {
//             compress: {
//                 //生产环境时移除console
//                 drop_console: true,
//                 drop_debugger: true,
//             },
//         },
//         // 取消计算文件大小，加快打包速度
//         reportCompressedSize: false,
//         sourcemap: false,
//         // assetsDir: 'static/img',
//         rollupOptions: {
//             output: {
//                 chunkFileNames: "js/[name]-[hash].js",
//                 entryFileNames: "js/[name]-[hash].js",
//                 assetFileNames: "[ext]/[name]-[hash].[ext]",
//             },
//         },
//         chunkSizeWarningLimit: 10000,
//     },
//     server: {
//         port: 3001, // 设置服务启动端口号
//         open: true, // 设置服务启动时是否自动打开浏览器
//         cors: true, // 允许跨域

//         // 设置代理，根据我们项目实际情况配置
//         proxy: {
//             "/api": {
//                 target: "http://192.168.2.235:38050",
//                 changeOrigin: true,
//                 secure: false,
//                 // rewrite: (path) => path.replace("/api/", "/"),
//             },
//         },
//     },
// });
