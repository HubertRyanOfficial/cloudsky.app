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
  notes: [
    {
      id: 1,
      tag: null,
      notes: [],
    },
  ],
  selected: null,
  tags: [{ id: 1, name: null }],
  tagSelected: null,
  total: 0,
};

export const ACTIONS = {
  INITIAL_STATE: "INITIAL_STATE",
  ADD_NEW_NOTE: "ADD_NEW_NOTE",
  EDIT_NOTE: "EDIT_NOTE",
  REMOVE_NOTE: "REMOVE_NOTE",
  SELECT_NOTE: "SELECT_NOTE",
  FORCE_NEW_NOTE: "FORCE_NEW_NOTE",
  CREATE_NEW_TAG: "CREATE_NEW_TAG",
  SELECT_TAG: "SELECT_TAG",
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INITIAL_STATE: {
      return { ...state, ...action.payload };
    }
    case ACTIONS.ADD_NEW_NOTE: {
      let notes = [...state.notes];

      let index = !!state.tagSelected
        ? state.notes.findIndex((item) => item.id == state.tagSelected.id)
        : 0;

      if (index >= 0) {
        notes[index] = {
          ...notes[index],
          notes: [
            ...notes[index].notes,
            {
              ...action.payload,
              tagId: state.tagSelected?.id ?? null,
            },
          ],
        };
      } else {
        notes.push({
          id: state.notes.length + 1,
          tag: state.tags.find((item) => item.id == state.tagSelected.id),
          notes: [{ ...action.payload, tagId: state.tagSelected?.id ?? null }],
        });
      }

      return {
        ...state,
        notes,
        total: state.total + 1,
        tagSelected: null,
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
      const note = action.payload;
      let tagSelected = !!note.tagId
        ? state.tags.find((item) => item.id == note.tagId)
        : null;

      return {
        ...state,
        selected: action.payload,
        tagSelected,
      };
    }
    case ACTIONS.REMOVE_NOTE: {
      let notes = [...state.notes];
      let selectedNote = state.selected;

      let tagGroupIndex = selectedNote?.tagId
        ? notes.findIndex((item) => item.id == selectedNote.tagId)
        : 0;
      let groupState = notes[tagGroupIndex].notes.filter(
        (item) => item.id != selectedNote.id
      );

      notes[tagGroupIndex].notes = groupState;

      return {
        ...state,
        notes,
        selected: null,
        total: state.total - 1,
        tagSelected: null,
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
        tagSelected: action.payload,
      };
    }
    case ACTIONS.SELECT_TAG: {
      return {
        ...state,
        tagSelected: action.payload,
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
        new: true,
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

  const removeNote = () => {
    dispatch({
      type: ACTIONS.REMOVE_NOTE,
    });
  };

  const selectNote = (note) => {
    dispatch({
      type: ACTIONS.SELECT_NOTE,
      payload: note,
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

  const selectTag = (tag) => {
    dispatch({
      type: ACTIONS.SELECT_TAG,
      payload: tag,
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
    selectTag,
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
