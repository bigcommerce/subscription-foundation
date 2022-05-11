export const getError = (status: number, message: string) => {
  return {
    errors: {
      status,
      code: status,
      message
    }
  };
};
