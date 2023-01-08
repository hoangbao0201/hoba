
import Head from "next/head";
import GlobalStyles from '../../components/GlobalStyles';
import FormRegister from "../../components/FormRegister";

export interface LoginProps {}
const Login = () => {
    
    return (
        <>
            <Head>
                <title>Login - HoBa</title>
            </Head>

            <main>
                <GlobalStyles>
                    <FormRegister />
                </GlobalStyles>
            </main>
        </>
    );
};

export default Login;
