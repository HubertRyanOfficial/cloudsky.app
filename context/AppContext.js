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
      fixed: false,
    },
  ],
  selected: null,
  tags: [{ id: 1, name: null }],
  tagSelected: null,
  total: 0,
  fixTag: false,
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
  SET_FIX_TAG: "SET_FIX_TAG",
  REMOVE_TAG: "REMOVE_TAG",
  PIN_TAG: "PIN_TAG",
  RENAME_TAG: "RENAME_TAG",
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
              id: notes[index].notes.length + 1,
              tagId: state.tagSelected?.id ?? null,
            },
          ],
        };
      } else {
        notes.push({
          id: state.notes.length + 1,
          tag: state.tags.find((item) => item.id == state.tagSelected.id),
          fixed: false,
          notes: [
            { ...action.payload, id: 1, tagId: state.tagSelected?.id ?? null },
          ],
        });
      }

      let newState = {
        ...state,
        notes,
        total: state.total + 1,
        tagSelected: null,
      };

      if (!!state.fixTag) {
        newState.tagSelected = state.tagSelected;
      }

      return newState;
    }
    case ACTIONS.EDIT_NOTE: {
      let notes = [...state.notes];
      let noteGroupIndexSelected = !!state.selected.tagId
        ? state.notes.findIndex((item) => item.id == state.selected.tagId)
        : 0;

      if (
        noteGroupIndexSelected >= 0 &&
        state.selected.tagId != state?.tagSelected?.id
      ) {
        notes[noteGroupIndexSelected].notes = notes[
          noteGroupIndexSelected
        ].notes.filter((item) => item.id != state.selected.id);

        let index = !!state.tagSelected
          ? notes.findIndex((item) => item.id == state.tagSelected.id)
          : 0;

        if (index >= 0) {
          notes[index] = {
            ...notes[index],
            notes: [
              ...notes[index].notes,
              {
                ...action.payload,
                id: notes[index].notes.length + 1,
                tagId: state.tagSelected?.id ?? null,
              },
            ],
          };
        } else {
          notes.push({
            id: state.notes.length + 1,
            tag: state.tags.find((item) => item.id == state.tagSelected.id),
            notes: [
              {
                ...action.payload,
                id: 1,
                tagId: state.tagSelected?.id ?? null,
              },
            ],
          });
        }
      } else if (
        state.selected.tagId == state?.tagSelected?.id ||
        !state.tagSelected ||
        !state.selected.tagId
      ) {
        let noteIndexSelected = notes[noteGroupIndexSelected].notes.findIndex(
          (item) => item.id == state.selected.id
        );

        notes[noteGroupIndexSelected].notes[noteIndexSelected] = {
          ...notes[noteGroupIndexSelected].notes[noteIndexSelected],
          title: action.payload.title,
          content: action.payload.content,
        };
      }

      let newState = {
        ...state,
        notes,
        selected: null,
        tagSelected: null,
      };

      if (!!state.fixTag) {
        newState.tagSelected = state.tagSelected;
      }

      return newState;
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

      let newState = {
        ...state,
        notes,
        selected: null,
        total: state.total - 1,
        tagSelected: null,
      };

      if (!!state.fixTag) {
        newState.tagSelected = state.tagSelected;
      }

      return newState;
    }
    case ACTIONS.FORCE_NEW_NOTE: {
      let newState = {
        ...state,
        selected: null,
        tagSelected: null,
      };

      if (!!state.fixTag) {
        newState.tagSelected = state.tagSelected;
      }

      return newState;
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
        fixTag: false,
      };
    }
    case ACTIONS.SET_FIX_TAG: {
      return {
        ...state,
        fixTag: action.payload,
      };
    }
    case ACTIONS.REMOVE_TAG: {
      const tagId = action.payload;
      let tagData = state.notes.find((item) => item?.tag?.id == tagId);
      let notes = [...state.notes].filter((item) => item?.tag?.id != tagId);

      return {
        ...state,
        notes,
        tags: state.tags.filter((item) => item.id != tagId),
        total: state.total - tagData.notes.length,
        tagSelected: null,
        selected: null,
        fixTag: false,
      };
    }
    case ACTIONS.PIN_TAG: {
      const tagId = action.payload;
      let notes = [...state.notes];
      let tagGroupIndex = notes.findIndex((item) => item?.tag?.id == tagId);

      notes[tagGroupIndex] = {
        ...notes[tagGroupIndex],
        fixed: !notes[tagGroupIndex]?.fixed,
      };

      return {
        ...state,
        notes,
      };
    }
    case ACTIONS.RENAME_TAG: {
      const tagId = action.payload.tagId;
      const newName = action.payload.newname;

      let notes = [...state.notes];
      let tags = [...state.tags];

      let tagGroupIndex = notes.findIndex((item) => item?.tag?.id == tagId);
      let tagIndex = notes.findIndex(
        (item) => item.id == notes[tagGroupIndex].tag.id
      );

      tags[tagIndex] = {
        ...tags[tagIndex],
        name: newName,
      };

      notes[tagGroupIndex] = {
        ...notes[tagGroupIndex],
        tag: {
          ...notes[tagGroupIndex].tag,
          name: newName,
        },
      };
      return {
        ...state,
        notes,
        tags,
        tagSelected: null,
        selected: null,
        fixTag: false,
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

  const setFixTag = (value) =>
    dispatch({ type: ACTIONS.SET_FIX_TAG, payload: value });

  const removeTag = (tagId) =>
    dispatch({ type: ACTIONS.REMOVE_TAG, payload: tagId });

  const pinTag = (tagId) => dispatch({ type: ACTIONS.PIN_TAG, payload: tagId });

  const renameTag = (payload) =>
    dispatch({ type: ACTIONS.RENAME_TAG, payload });

  return {
    ...state,
    addNewNote,
    editNote,
    removeNote,
    selectNote,
    forceNewNote,
    createNewTag,
    selectTag,
    setFixTag,
    removeTag,
    pinTag,
    renameTag,
  };
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, InitialState);
  const contextValues = useMemo(() => [state, dispatch], [state]);

  useEffect(() => {
    const env = process.env.NODE_ENV;
    if (env == "development") {
      localStorage.removeItem("@cloudsky-general-storage");
    }

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
