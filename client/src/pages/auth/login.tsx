import Head from "next/head";
import { getSession, useSession } from "next-auth/react";

import GlobalStyles from "../../components/GlobalStyles";
import FormLogin from "../../components/FormLogin";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";

export interface LoginProps {}
const Login: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    if (session) {
        return <></>
    }

    return (
        <>
            <Head>
                <title>Login - HoBa</title>
            </Head>

            <main>
                <GlobalStyles>
                    <FormLogin />
                </GlobalStyles>
            </main>
        </>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    const session = await getSession(ctx);

    return {
        props: {
            session,
        },
    };
}

export default Login;
