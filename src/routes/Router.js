import { createBrowserRouter} from "react-router-dom";
import Dashboard from ".././views/Dashboard/Dashboard"
import TarjetaQr from "../views/Presentasion/TarjetaQr";
import SignInSide from "../views/Login/Login";
import RegisterViewForm from "../views/Register/RegisterViewForm";
import RegisterView from "../views/Register/Register";
import PasswordRecovery from "../views/Login/RecuperarContraseña";
import CardEdit from "../views/Dashboard/Components/Edit/CardEdit";
import ResetPassword from "../views/Login/NuevaContraseña";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <SignInSide></SignInSide>
    },
    {
        path: "/OnlyTap",
        element: <Dashboard></Dashboard>
    },
    {
        path: "/OnlyTap/CardEdit",
        element: <CardEdit></CardEdit>
    },
    {
        path: `/OnlyTap/Presentacion/:id`,
        element: <TarjetaQr></TarjetaQr>
    },
    {
        path: "/OnlyTap/Register",
        element: <RegisterViewForm></RegisterViewForm>
    },
    {
        path: "/OnlyTap/RegisterFrom",
        element: <RegisterView></RegisterView>
    },
    {
        path: "/OnlyTap/RecuperarContraseña",
        element: <PasswordRecovery></PasswordRecovery>
    },
    {
        path: "/reset",
        element: <ResetPassword></ResetPassword>
    }
    
]);


export default Router;

