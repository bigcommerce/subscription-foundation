import React from "react";

const LOADING = "loading";
interface LoadingAction {
  type: typeof LOADING;
}

const DONE = "done";
interface DoneAction {
  type: typeof DONE;
  data: any;
}

const ERROR = "errorr";
interface ErrorAction {
  type: typeof ERROR;
  error: any;
}

type Action = LoadingAction | DoneAction | ErrorAction;

interface State<T> {
  loading: boolean;
  data: T | null;
  error: any;
}

// Wrap in create function to pass generic type to state
const createReducer =
  <T>() =>
  (_state: State<T>, action: Action): State<T> => {
    switch (action.type) {
      case LOADING: {
        return { loading: true, data: null, error: null };
      }
      case DONE: {
        return { loading: false, data: action.data, error: null };
      }
      case ERROR: {
        return { loading: false, data: null, error: action.error };
      }
    }
  };

export function useAsync<T>(
  asyncCallback: (...args: any[]) => Promise<T | null>
) {
  const initialState: State<T> = {
    data: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = React.useReducer(createReducer<T>(), initialState);

  React.useEffect(() => {
    let mounted = true;
    dispatch({ type: LOADING });

    asyncCallback()
      .then(data => mounted && dispatch({ type: DONE, data }))
      .catch(error => mounted && dispatch({ type: ERROR, error }));

    return () => {
      mounted = false;
    };
  }, [asyncCallback]);

  return state;
}
