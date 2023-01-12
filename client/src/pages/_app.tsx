import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Router } from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloProvider } from "@apollo/client/react";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    credentials: "include",
});

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ApolloProvider>
    );
}
