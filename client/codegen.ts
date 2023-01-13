import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:4000/graphql",
    documents: "src/graphql/**/*.graphql",
    ignoreNoDocuments: true,
    generates: {
        "./src/generated/graphql.ts": {
            // preset: "client",
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ],
            config: {
                widthHooks: true
            }
        }
    },
};

export default config;
