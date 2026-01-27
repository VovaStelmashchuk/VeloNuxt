import { defineEventHandler, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (_) => {
    return {
        url: await buildGoogleAuthLink(),
    };
});

async function buildGoogleAuthLink() {
    const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl;
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    // @ts-ignore
    url.searchParams.append("client_id", config.public.googleClientId);
    url.searchParams.append("redirect_uri", `${baseUrl}/auth/google/callback`);
    url.searchParams.append("response_type", "token");
    url.searchParams.append("scope", "email profile");

    return url.toString();
}
