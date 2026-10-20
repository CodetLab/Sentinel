import api from "../api/client";
import localApi from "../api/local.client";

const SYNC_KEY = "sentinel:profile-synced";

type SyncResponse = {
    success: boolean;
    profile?: unknown;
    cached?: boolean;
};

let syncInFlight: Promise<SyncResponse> | null = null;
let syncGeneration = 0;

export async function getMyProfile() {
    const res = await api.get("/account/me");
    return res.data;
}

export async function syncMyProfile(): Promise<SyncResponse> {
    if (sessionStorage.getItem(SYNC_KEY) === "1") {
        return {
            success: true,
            cached: true,
        };
    }

    if (syncInFlight) {
        return syncInFlight;
    }

    const generation = syncGeneration;

    syncInFlight = localApi
        .post<SyncResponse>("/sync/sync")
        .then(({ data }) => {
            if (!data.success) {
                throw new Error("Profile synchronization failed");
            }

            if (generation === syncGeneration) {
                sessionStorage.setItem(SYNC_KEY, "1");
            }

            return data;
        })
        .finally(() => {
            if (generation === syncGeneration) {
                syncInFlight = null;
            }
        });

    return syncInFlight;
}

/**
 * Llamar al iniciar una nueva sesión autenticada
 * y al cerrar sesión.
 */
export function resetProfileSyncState() {
    sessionStorage.removeItem(SYNC_KEY);
    syncGeneration += 1;
    syncInFlight = null;
}