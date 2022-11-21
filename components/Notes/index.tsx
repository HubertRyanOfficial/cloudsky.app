import { useEffect, useState } from "react";

import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

import { AnimatePresence, motion } from "framer-motion";

import {
  BiDotsHorizontalRounded,
  BiPin,
  BiChevronLeft,
  BiX,
} from "react-icons/bi";

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
    renameTag,
  }: {
    notes: NotesProps[];
    forceNewNote: () => void;
    total: number;
    removeTag: (payload: any) => void;
    pinTag: (payload: any) => void;
    renameTag: (payload: any) => void;
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
                fixed={item.fixed}
                removeTag={removeTag}
                pinTag={pinTag}
                renameTag={renameTag}
              />
              <div className={styles.notesGroup}>
                <AnimatePresence>
                  {item.notes.map((noteItem: NoteItemProps, index) => (
                    <NoteItem key={noteItem.id} item={noteItem} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );

        return (
          <div key={item.id}>
            <AnimatePresence>
              {item.notes.map((noteItem: NoteItemProps, index) => (
                <NoteItem key={noteItem.id} item={noteItem} index={index} />
              ))}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const NoteGroupTitle = ({
  data,
  fixed,
  removeTag,
  pinTag,
  renameTag,
}: {
  data: {
    name: string;
    id: string;
  };
  fixed: boolean;
  removeTag: any;
  pinTag: any;
  renameTag: any;
}) => {
  const [showsOptions, setShowsOptions] = useState(false);
  const [showRenameTag, setShowRenameTag] = useState(false);
  const [confirmRemoveTag, setConfirmRemoveTag] = useState(false);
  const [newNameValue, setNewNameValue] = useState(data?.name ?? "");

  function handleRemoveTag() {
    setShowsOptions(false);
    setConfirmRemoveTag(false);
    removeTag(data.id);
  }

  function hanldePinTag() {
    setShowsOptions(false);
    pinTag(data.id);
  }

  function handleToggleModal() {
    if (showsOptions) setShowRenameTag(false);
    setShowsOptions(!showsOptions);
  }

  function handleRenameTag() {
    handleToggleModal();
    renameTag({ tagId: data.id, newname: newNameValue });
  }

  return (
    <>
      <motion.div
        onClick={() => handleToggleModal()}
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
          >
            {!showRenameTag ? (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => hanldePinTag()}
                >
                  {!fixed ? "Fixar" : "Desfixar"}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setShowRenameTag(true)}
                >
                  Renomear
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => {
                    handleToggleModal();
                    setConfirmRemoveTag(true);
                  }}
                >
                  Excluir projeto
                </motion.span>
              </>
            ) : (
              <>
                <div
                  className={styles.renameContainer}
                  onClick={() => setShowRenameTag(false)}
                >
                  <BiChevronLeft size={28} />
                  <motion.span
                    initial={{ opacity: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, marginLeft: 20 }}
                    transition={{ duration: 0.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    Renomear
                  </motion.span>
                </div>

                <motion.input
                  value={newNameValue}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.8 }}
                  onChange={(e) => setNewNameValue(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key == "Enter" && handleRenameTag()}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmRemoveTag && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.removeTagContent}
            onClick={() => setConfirmRemoveTag(false)}
          >
            <div
              className={styles.removeTagBox}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={styles.removeTagBoxHeader}
                onClick={() => setConfirmRemoveTag(false)}
              >
                <BiX size={22} />
              </motion.div>
              <strong>Tem certeza?</strong>
              <span>
                Confirme se realmente deseja remover esse projeto de um vez.
              </span>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={styles.removeConfirm}
                onClick={() => handleRemoveTag()}
              >
                <span>Remover projeto</span>
              </motion.div>
            </div>
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
