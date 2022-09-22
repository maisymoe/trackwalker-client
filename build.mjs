import { build } from "esbuild";

try {
    await build({
        entryPoints: ["./src/poststart.ts"],
        outfile: "./dist/poststart.js",
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