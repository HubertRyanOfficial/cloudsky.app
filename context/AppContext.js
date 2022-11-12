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
  selected: null,
};

export const ACTIONS = {
  INITIAL_STATE: "INITIAL_STATE",
  ADD_NEW_NOTE: "ADD_NEW_NOTE",
  EDIT_NOTE: "EDIT_NOTE",
  REMOVE_NOTE: "REMOVE_NOTE",
  SELECT_NOTE: "SELECT_NOTE",
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
    case ACTIONS.EDIT_NOTE: {
      let notes = [...state.notes];
      let noteIndex = notes.findIndex((item) => item.id == state.selected.id);
      notes[noteIndex] = {
        ...notes[noteIndex],
        title: action.payload.title,
        content: action.payload.content,
      };

      return {
        ...state,
        notes,
        selected: null,
      };
    }
    case ACTIONS.SELECT_NOTE: {
      let noteIndex = state.notes.findIndex(
        (item) => item.id == action.payload
      );
      return {
        ...state,
        selected: state.notes[noteIndex],
      };
    }
    case ACTIONS.REMOVE_NOTE: {
      const notes = state.notes.filter((item) => item.id != action.payload);
      return {
        ...state,
        notes,
        selected: null,
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

  const editNote = (note) => {
    dispatch({
      type: ACTIONS.EDIT_NOTE,
      payload: {
        ...note,
      },
    });
  };

  const removeNote = (id) => {
    dispatch({
      type: ACTIONS.REMOVE_NOTE,
      payload: id,
    });
  };

  const selectNote = (id) => {
    dispatch({
      type: ACTIONS.SELECT_NOTE,
      payload: id,
    });
  };

  return {
    ...state,
    addNewNote,
    editNote,
    removeNote,
    selectNote,
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
    if (!state.isLoading) {
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
