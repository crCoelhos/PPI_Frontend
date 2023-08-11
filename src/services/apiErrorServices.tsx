// errorService.js
export function handleApiError(error: { response: { status: any; data: any; }; request: any; message: any; }) {
  if (error.response) {
    console.error("API Error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("Request Error:", error.request);
  } else {
    console.error("Request Setup Error:", error.message);
  }
  throw error;
}
