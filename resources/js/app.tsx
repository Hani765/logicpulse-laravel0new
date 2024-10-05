import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "./providers/theme-provider";
import { ThemeToggle } from "./components/ThemeToggle";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/landing/ScrollToTop";
import { Toaster } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <BrowserRouter>
                    <App {...props} />
                </BrowserRouter>
                <Toaster richColors />
                <ScrollToTop />
                <ThemeToggle />
            </ThemeProvider>
        );
    },
    progress: {
        color: "hsl(var(--primary))",
    },
});
