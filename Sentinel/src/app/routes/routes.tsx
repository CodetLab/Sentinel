import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

import AuthPage from "../../pages/auth/AuthPage";
import VerifyEmailPage from "../../pages/auth/VerifyEmail";
import Vault from "../../pages/Vault/Vault";
import LogoutPage from "../../pages/LogoutPage";

import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth" replace />,
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/auth/verify-email",
        element: <VerifyEmailPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/vault",
                element: <Vault />,
            },
            {
                path: "/logout",
                element: <LogoutPage />,
            },
        ],
    },
]);