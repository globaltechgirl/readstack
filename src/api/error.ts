import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, any>;
    return data?.message || data?.error || error.message || "Request failed";
  }
  return "Unexpected error occurred";
}
