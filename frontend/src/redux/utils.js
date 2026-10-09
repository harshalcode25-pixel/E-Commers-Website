// Extracts a user-friendly message from an axios error, preferring the
// backend's own message over the generic "Request failed with status code..."
export const getErrorMessage = error =>
    error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
