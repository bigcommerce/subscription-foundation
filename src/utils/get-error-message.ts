const getErrorMessage = (error: any) => {
  return (
    error?.response?.data?.error ??
    error?.response?.message ??
    error?.response?.error?.message ??
    error?.response?.data?.message ??
    error?.response?.data?.errors?.message ??
    "Something went wrong"
  );
};

export default getErrorMessage;
