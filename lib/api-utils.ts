import { toast } from "@/hooks/use-toast";

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);
  
  let message = "An unexpected error occurred. Please try again.";
  let title = "Error";
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;
    if (apiError.message) {
      message = apiError.message;
    }
    if (apiError.code) {
      title = `Error ${apiError.code}`;
    }
  }

  toast({
    title,
    description: message,
    variant: "destructive",
  });

  return { message, title };
}

export function handleSuccess(message: string) {
  toast({
    title: "Success",
    description: message,
    variant: "default",
  });
}

export async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}