import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL

export const $migaikApi = axios.create({
    baseURL: API_URL
})

$migaikApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$migaikApi.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = { ...error.config };
        originalRequest._isRetry = true;
        if (
            error.response.status === 401 &&
            error.response.data.error === "bad_request" &&
            error.response.data.error &&
            error.config &&
            !error.config._isRetry
        ) {
            // eslint-disable-next-line no-useless-catch
            try {
                const resp = await $migaikApi.get("/auth/refresh_token");
                localStorage.setItem("token", resp.data.token);
                return $migaikApi.request(originalRequest);
            } catch (error) {
                throw error;
            }
        } else if (
            error.response.status === 400 &&
            error.response.data.error === "bad_request" &&
            error.response.data.error &&
            error.config
        ) {
            localStorage.clear();
            window.location.reload();
        }
        throw error;
    }
);
