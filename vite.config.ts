// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    optimizeDeps: {
      // Pre-bundle every dependency the app can pull in lazily (the offer popup's dialog
      // primitive, the 3D scene, the toast host). Discovering one mid-session makes Vite
      // re-bundle React, and a page already holding the previous React copy then crashes
      // with "Cannot read properties of null (reading 'useRef')".
      include: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/client",
        "@radix-ui/react-dialog",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-popover",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-select",
        "@radix-ui/react-tabs",
        "@radix-ui/react-tooltip",
        "@radix-ui/react-accordion",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-switch",
        "@radix-ui/react-slider",
        "@radix-ui/react-label",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "lucide-react",
        "sonner",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        "@tanstack/react-query",
        "@react-three/fiber",
        "@react-three/drei",
        "three",
      ],
    },
  },
});
