import { useState } from "react";
import DialogModal from "../../../../../custom_components/DialogModal";
import NewPrimaryButton from "../../../../../custom_components/NewPrimaryButton";
import { createUserNote } from "../../../../../utils/api/admin";
import useAxios from "../../../../../utils/useAxios";
import NewInput from "../../../../NewInput";

const StaffPanelSearchUserNotesAddNoteDialog = (props) => {
  const { open, onClose, username, notes, setNotes } = props;
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleClose = () => {
    setLoading(false);
    setNote("");
    setError("");
    setSuccess("");
    onClose();
  };

  const addNote = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    createUserNote(api, username, note).then((res) => {
      setLoading(false);
      setNote("");
      if (!res?.error) {
        let newUserNotes = [...notes, note];
        setNotes([...newUserNotes]);
        setSuccess("Note added.");
      } else {
        setError("Something went wrong.");
      }
    });
  };

  return (
    <DialogModal
      title="Add note"
      open={open}
      onClose={handleClose}
      button={
        <NewPrimaryButton
          label="create"
          loading={loading}
          onClick={addNote}
          disabled={note == null || note === ""}
        />
      }
      success={success}
      setSuccess={setSuccess}
      error={error}
      setError={setError}
    >
      <NewInput
        placeholder={"Note"}
        onChange={(value) => setNote(value)}
        value={note}
        disabled={loading}
      />
    </DialogModal>
  );
};

export default StaffPanelSearchUserNotesAddNoteDialog;
