import {
  useMemo,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const AppContext = createContext(null);

const InitialState = {
  isLoading: true,
  notes: [],
};

export const ACTIONS = {
  INITIAL_STATE: "INITIAL_STATE",
  ADD_NEW_NOTE: "ADD_NEW_NOTE",
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INITIAL_STATE: {
      return { ...state, ...action.payload };
    }
    case ACTIONS.ADD_NEW_NOTE: {
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`useApp must be used within a AppProvider`);
  }

  const [state, dispatch] = context;

  const addNewNote = (note) => {
    const id = state.notes.length + 1;

    dispatch({
      type: ACTIONS.ADD_NEW_NOTE,
      payload: {
        ...note,
        id,
      },
    });
  };

  return {
    ...state,
    addNewNote,
  };
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, InitialState);
  const contextValues = useMemo(() => [state, dispatch], [state]);

  useEffect(() => {
    async function loadApp() {
      const response = await localStorage.getItem("@younotyapp-notes");
      const persistedData = await JSON.parse(response);

      dispatch({
        type: ACTIONS.INITIAL_STATE,
        payload: {
          ...persistedData,
          isLoading: false,
        },
      });
    }
    setTimeout(() => {
      loadApp();
    }, 2500);
  }, []);

  useEffect(() => {
    if (state.notes.length > 0) {
      const newState = {
        ...state,
        isLoading: true,
      };
      const persistedState = JSON.stringify(newState);
      localStorage.setItem("@younotyapp-notes", persistedState);
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}

export { AppProvider, useApp };
