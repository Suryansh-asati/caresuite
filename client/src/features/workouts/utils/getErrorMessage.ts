type ApiErrorShape = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  const apiError = error as ApiErrorShape;
  return apiError.response?.data?.message || fallbackMessage;
};
