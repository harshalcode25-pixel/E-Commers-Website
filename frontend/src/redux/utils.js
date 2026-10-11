// Extracts a user-friendly message from an axios error, preferring the
// backend's own message over the generic "Request failed with status code..."
export function getErrorMessage(error) {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }

    return error.message;
}
