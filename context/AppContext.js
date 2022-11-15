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
  tags: [],
};

export const ACTIONS = {
  INITIAL_STATE: "INITIAL_STATE",
  ADD_NEW_NOTE: "ADD_NEW_NOTE",
  EDIT_NOTE: "EDIT_NOTE",
  REMOVE_NOTE: "REMOVE_NOTE",
  SELECT_NOTE: "SELECT_NOTE",
  FORCE_NEW_NOTE: "FORCE_NEW_NOTE",
  CREATE_NEW_TAG: "CREATE_NEW_TAG",
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
    case ACTIONS.FORCE_NEW_NOTE: {
      return {
        ...state,
        selected: null,
      };
    }
    case ACTIONS.CREATE_NEW_TAG: {
      return {
        ...state,
        tags: [...state.tags, action.payload],
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
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    dispatch({
      type: ACTIONS.ADD_NEW_NOTE,
      payload: {
        ...note,
        new: true,
        color: randomColor,
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

  const forceNewNote = () => {
    dispatch({
      type: ACTIONS.FORCE_NEW_NOTE,
    });
  };

  const createNewTag = (name) => {
    const id = state.tags.length + 1;

    dispatch({
      type: ACTIONS.CREATE_NEW_TAG,
      payload: {
        id,
        name,
      },
    });
  };

  return {
    ...state,
    addNewNote,
    editNote,
    removeNote,
    selectNote,
    forceNewNote,
    createNewTag,
  };
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, InitialState);
  const contextValues = useMemo(() => [state, dispatch], [state]);

  useEffect(() => {
    localStorage.removeItem("@cloudsky-general-storage");

    async function loadApp() {
      const response = await localStorage.getItem("@cloudsky-general-storage");
      let persistedData = await JSON.parse(response);

      if (persistedData?.notes.length > 0) {
        persistedData.notes = persistedData.notes.map((item) => ({
          ...item,
          new: false,
        }));
      }

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
      localStorage.setItem("@cloudsky-general-storage", persistedState);
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}

export { AppProvider, useApp };
