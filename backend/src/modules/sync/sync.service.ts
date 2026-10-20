import { upsertSentinelProfile } from "./sync.repository";

export async function syncSentinelUser(
    tenantUserId: number,
    name: string,
    email: string,
) {
    return upsertSentinelProfile(
        tenantUserId,
        name,
        email,
    );
}