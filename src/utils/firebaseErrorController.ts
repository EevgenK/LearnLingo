export const firebaseErrorController = (
  error: unknown,
  fallback = 'An unknown error occurred',
) => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};
