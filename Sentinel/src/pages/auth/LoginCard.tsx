import React, { useState } from "react";
import styles from "./Auth.module.css";

import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationContext";
import { resolveError } from "../../components/feedback/errorResolver";

import { useNavigate } from "react-router-dom";

import {
    resetProfileSyncState as resetSentinelSyncState,
    syncMyProfile as syncSentinelProfile,
} from "../../services/sync.service";

import { AuthHeader } from "./AuthHeader";

interface LoginProps {
    onSwitchToRegister: () => void;
}

export const LoginCard: React.FC<LoginProps> = ({
    onSwitchToRegister,
}) => {
    const navigate = useNavigate();

    const { login } = useAuth();
    const { notify } = useNotification();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [syncing, setSyncing] = useState(false);

    const { submit, loading } = useLogin();

    const iniciarSesion = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (loading || syncing) return;

        notify.pending("Iniciando sesión...");

        const response = await submit({
            email,
            password,
            appSlug: "nexo",
        });

        if (!response) return;

        const { token, user } = response;

        if (!token || !user) {
            console.error(
                "Respuesta de login inválida:",
                response
            );

            notify.error(
                "El servidor devolvió una respuesta de autenticación inválida."
            );

            return;
        }

        setSyncing(true);

        try {
            // Una nueva autenticación inicia un nuevo ciclo.
            resetSentinelSyncState();

            // Persistir la sesión antes de realizar la petición.
            await login(token, user);

            notify.pending(
                "Inicializando tu perfil de Sentinel..."
            );

            // Debe terminar correctamente antes de permitir el acceso.
            await syncSentinelProfile();

            notify.success(
                "Inicio de sesión correcto."
            );

            navigate("/vault");
        } catch (error: unknown) {
            console.error(
                "Error inicializando el perfil de Sentinel:",
                error
            );

            notify.error(resolveError(error));
        } finally {
            setSyncing(false);
        }
    };

    const isFormValid =
        email.includes("@") &&
        password.length >= 4;

    const isSubmitting = loading || syncing;

    return (
        <div className={styles.container}>
            <AuthHeader
                title="Bienvenido"
                subtitle="Ingresa a Sentinel"
            />

            <form
                onSubmit={iniciarSesion}
                className={styles.form}
            >
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Correo electrónico"
                        className={styles.formInput}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Contraseña"
                        className={styles.formInput}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={styles.btn}
                >
                    {syncing
                        ? "Preparando Sentinel..."
                        : loading
                            ? "Ingresando..."
                            : "Iniciar sesión"}
                </button>
            </form>

            <button
                type="button"
                onClick={onSwitchToRegister}
                className={styles.linkBtn}
                disabled={isSubmitting}
            >
                Ir a registro
            </button>
        </div>
    );
};