// Owner access is granted ONLY to emails listed in OWNER_EMAILS (comma-separated) who sign in with Google.
export const isOwnerEmail = (e: string) => (process.env.OWNER_EMAILS ?? "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean).includes(e.toLowerCase());
