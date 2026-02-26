import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

// ── Types ────────────────────────────────────────────────────────────────────

/** Shape of an API error response from FakeStore (or any standard REST API) */
export interface ApiErrorResponse {
    message?: string;
    status?: number;
    error?: string;
}

/** Normalised error thrown by the application after interceptor processing */
export class ApiError extends Error {
    public readonly status: number;
    public readonly data: ApiErrorResponse | null;

    constructor(message: string, status: number, data: ApiErrorResponse | null = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const isDev = import.meta.env.DEV;

function log(label: string, ...args: unknown[]) {
    if (isDev) console.log(`%c[API] ${label}`, 'color:#7c6aff;font-weight:bold', ...args);
}

function logError(label: string, ...args: unknown[]) {
    if (isDev) console.error(`%c[API Error] ${label}`, 'color:#ef4444;font-weight:bold', ...args);
}

/** Map HTTP status codes to human-readable messages */
function resolveErrorMessage(status: number, serverMessage?: string): string {
    if (serverMessage) return serverMessage;
    const messages: Record<number, string> = {
        400: 'Bad request — please check your input.',
        401: 'Unauthorised — please log in.',
        403: 'Forbidden — you do not have permission.',
        404: 'The requested resource was not found.',
        408: 'The request timed out.',
        422: 'Unprocessable entity — validation failed.',
        429: 'Too many requests — please slow down.',
        500: 'Server error — please try again later.',
        502: 'Bad gateway — server is unavailable.',
        503: 'Service unavailable — please try again later.',
    };
    return messages[status] ?? `Unexpected error (HTTP ${status}).`;
}

// ── Interceptor setup ────────────────────────────────────────────────────────

export function applyInterceptors(client: AxiosInstance): void {
    // ── REQUEST interceptor ──────────────────────────────────────────────────

    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // 1. Attach auth token if present (JWT-ready, FakeStore doesn't need one)
            const token = typeof localStorage !== 'undefined'
                ? localStorage.getItem('auth_token')
                : null;
            if (token && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            // 2. Attach a unique request ID for request tracing/debugging
            const requestId = crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).slice(2);
            if (config.headers) config.headers['X-Request-Id'] = requestId;

            // 3. Dev logging
            log(`→ ${config.method?.toUpperCase()} ${config.url}`, {
                params: config.params,
                data: config.data,
                requestId,
            });

            return config;
        },
        (error: AxiosError) => {
            logError('Request setup failed', error.message);
            return Promise.reject(error);
        }
    );

    // ── RESPONSE interceptor ─────────────────────────────────────────────────

    client.interceptors.response.use(
        (response: AxiosResponse) => {
            // Log successful responses in dev
            log(
                `← ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
                response.data
            );
            return response;
        },
        (error: AxiosError<ApiErrorResponse>) => {
            // Network / timeout errors (no response at all)
            if (!error.response) {
                const isTimeout = error.code === 'ECONNABORTED';
                const msg = isTimeout
                    ? 'The request timed out. Check your connection.'
                    : 'Network error — unable to reach the server.';
                logError('Network', msg);
                return Promise.reject(new ApiError(msg, 0));
            }

            const { status, data } = error.response;
            const serverMessage =
                data?.message ?? data?.error ?? undefined;
            const message = resolveErrorMessage(status, serverMessage);

            logError(`HTTP ${status}`, message, {
                url: error.config?.url,
                data,
            });

            // ── Status-specific side-effects ────────────────────────────────────

            if (status === 401) {
                // Clear stale token (token refresh would go here in a real app)
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
                // Optionally redirect to login — uncomment when auth is wired up:
                // window.location.href = '/login';
            }

            if (status === 403) {
                // Could redirect to a "403 Forbidden" page here
            }

            // Reject with a typed ApiError so stores can read `.status`
            return Promise.reject(
                new ApiError(message, status, data ?? null)
            );
        }
    );
}

// ── Utility: type-guard for ApiError ────────────────────────────────────────

export const isApiError = (err: unknown): err is ApiError =>
    err instanceof ApiError;

// ── Utility: cancel-token factory ───────────────────────────────────────────

/**
 * Creates an AbortController-backed cancel token for long-running or
 * component-scoped requests.
 *
 * @example
 * const { signal, cancel } = createCancelToken();
 * axiosClient.get('/products', { signal });
 * // On unmount:
 * cancel();
 */
export const createCancelToken = () => {
    const controller = new AbortController();
    return {
        signal: controller.signal,
        cancel: (reason = 'Request cancelled by the user.') =>
            controller.abort(reason),
    };
};

/** Returns true if the error was caused by a deliberate request cancellation */
export const isRequestCancelled = (err: unknown): boolean =>
    axios.isCancel(err) ||
    (err instanceof Error && err.name === 'AbortError');
