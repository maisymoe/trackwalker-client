import { build } from "esbuild";

try {
    await build({
        entryPoints: ["./src/prestart.ts"],
        outfile: "./dist/prestart.js",
        minify: true,
        bundle: true,
        format: "iife",
        target: "esnext",
        legalComments: "external",
    });

    console.log("Build successful!");
} catch (e) {
    console.error("Build failed...", e);
    process.exit(1);
}