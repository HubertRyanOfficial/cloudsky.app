import { useState } from "react";

import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

import { AnimatePresence, motion } from "framer-motion";

import { BiDotsHorizontalRounded, BiPin } from "react-icons/bi";

import NoteItem from "../NoteItem";
import { NoteItemProps } from "../NoteItem";

interface NotesProps {
  id: string;
  tag: {
    id: string;
    name: string;
  };
  fixed: boolean;
  notes: NoteItemProps[];
}

const Notes = ({ titleRef }: { titleRef: any }) => {
  const {
    notes,
    forceNewNote,
    total,
    removeTag,
    pinTag,
  }: {
    notes: NotesProps[];
    forceNewNote: () => void;
    total: number;
    removeTag: (tagId: string) => void;
    pinTag: (tagId: string) => void;
  } = useApp();

  if (total == 0) return <EmptyState />;

  const sortedNotes = notes.sort((a, b) => {
    let tagA = a.fixed;
    let tagB = b.fixed;

    if (tagA && !tagB)
      //sort string ascending
      return -1;
    if (!tagA && tagB) return 1;
    return -1;
  });

  return (
    <div className={styles.container}>
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        whileTap={{
          scale: 0.9,
        }}
        transition={{ duration: 0.2 }}
        className={styles.newNote}
        onClick={() => {
          forceNewNote();
          if (titleRef?.current) {
            titleRef.current.focus();
          }
        }}
      >
        <strong>Criar uma nova nota</strong>
      </motion.div>

      {sortedNotes.map((item) => {
        if (item?.notes?.length == 0) return null;
        if (item.tag)
          return (
            <div className={styles.notesGroupContainer} key={item.id}>
              <NoteGroupTitle
                data={item.tag}
                removeTag={removeTag}
                fixed={item.fixed}
                pinTag={pinTag}
              />
              <div className={styles.notesGroup}>
                {item.notes.map((noteItem: NoteItemProps, index) => (
                  <NoteItem key={noteItem.id} item={noteItem} index={index} />
                ))}
              </div>
            </div>
          );

        return (
          <div key={item.id}>
            {item.notes.map((noteItem: NoteItemProps, index) => (
              <NoteItem key={noteItem.id} item={noteItem} index={index} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const NoteGroupTitle = ({
  data,
  removeTag,
  fixed,
  pinTag,
}: {
  data: {
    name: string;
    id: string;
  };
  fixed: boolean;
  removeTag: any;
  pinTag: any;
}) => {
  const [showsOptions, setShowsOptions] = useState(false);

  function handleRemoveTag() {
    setShowsOptions(false);
    removeTag(data.id);
  }

  function hanldePinTag() {
    setShowsOptions(false);
    pinTag(data.id);
  }

  return (
    <>
      <motion.div
        onClick={() => setShowsOptions(!showsOptions)}
        className={styles.notesGroupTitle}
        whileTap={{ scale: 0.9 }}
      >
        {fixed && <BiPin size={22} color="#ff4f4b" />}
        <span>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</span>
        <BiDotsHorizontalRounded
          size={25}
          color="#dddddd"
          style={{ marginRight: 20 }}
        />
      </motion.div>

      <AnimatePresence>
        {showsOptions && (
          <motion.div
            initial={{
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            className={styles.notesGroupModalContainer}
            onClick={() => hanldePinTag()}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.8 }}
            >
              {!fixed ? "Fixar" : "Desfixar"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.8 }}
            >
              Renomear
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleRemoveTag()}
            >
              Excluir projeto
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const EmptyState = () => {
  return (
    <div className={styles.emptyContainer}>
      <span>
        Aqui ficarão todas as suas notas. Comece a criar suas notas no lado
        direito!
      </span>
    </div>
  );
};

export default Notes;
