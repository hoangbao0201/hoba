import Head from "next/head";
// import { getSession, useSession } from "next-auth/react";

import FormLogin from "../../components/FormLogin";
// import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import GlobalStyles from "../../components/GlobalStyles";

export interface LoginProps {}
const Login = () => {
    const router = useRouter();
    const newRouter = useBreadcrumbs(router);

    // const router = useRouter();
    // const { data: session } = useSession();

    // if (session) {
    //     router.push("/");
    // }

    return (
        <>
            <Head>
                <title>{newRouter[newRouter.length - 1].title} - HoBa</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <GlobalStyles>
                    <FormLogin />
                </GlobalStyles>
            </main>
        </>
    );
};

// export async function getServerSideProps(ctx: NextPageContext) {
//     const session = await getSession(ctx);

//     return {
//         props: {
//             session,
//         },
//     };
// }

export default Login;
