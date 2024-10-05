import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        sourcemap: true,

        rollupOptions: {
            onLog(level, log, handler) {
                if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
                    return
                }
                handler(level, log)
            }
        }
    },
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
});
