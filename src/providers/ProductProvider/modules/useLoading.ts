import { useProductContext } from "../context";

function useLoading() {
  const { loading, setLoading } = useProductContext();
  return {
    loading,
    setLoading
  };
}

export default useLoading;
