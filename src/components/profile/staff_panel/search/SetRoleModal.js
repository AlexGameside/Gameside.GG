import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import BubbleButton from "../../../../custom_components/BubbleButton";
import DialogModal from "../../../../custom_components/DialogModal";
import NewPrimaryButton from "../../../../custom_components/NewPrimaryButton";
import { promoteUser } from "../../../../utils/api/admin";
import useAxios from "../../../../utils/useAxios";

const SetRoleModal = (props) => {
  const { open, onClose, setRole, role, username } = props;
  const api = useAxios();

  const [newRole, setNewRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleClose = () => {
    setLoading(false);
    setNewRole(role);
    setError(null);
    setSuccess(null);
    onClose();
  };

  const updateRole = (updatedRole) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    promoteUser(api, username, updatedRole).then((res) => {
      setLoading(false);
      if (!res?.error) {
        setRole(updatedRole);
        setSuccess(res?.message);
      } else {
        setError(res?.message);
        setNewRole(role);
      }
    });
  };

  useEffect(() => {
    setNewRole(role);
  }, [role]);

  return (
    <DialogModal
      open={open}
      onClose={handleClose}
      title="Set Role"
      button={
        <NewPrimaryButton
          label="Set Role"
          loading={loading}
          disabled={newRole === role}
          onClick={() => updateRole(newRole)}
        />
      }
      error={error}
      setError={setError}
      success={success}
      setSuccess={setSuccess}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 1 }}
      >
        <Grid item>
          <BubbleButton
            title="Player"
            selected={newRole === 1}
            onClick={() => setNewRole(1)}
          />
        </Grid>

        <Grid item>
          <BubbleButton
            title="Beta Tester"
            selected={newRole >= 2 && newRole < 100}
            onClick={() => setNewRole(2)}
          />
        </Grid>

        <Grid item>
          <BubbleButton
            title="Mod"
            selected={newRole >= 100 && newRole < 200}
            onClick={() => setNewRole(100)}
          />
        </Grid>

        <Grid item>
          <BubbleButton
            title="Senior Mod"
            selected={newRole >= 200 && newRole < 300}
            onClick={() => setNewRole(200)}
          />
        </Grid>

        <Grid item>
          <BubbleButton
            title="Admin"
            selected={newRole >= 300}
            onClick={() => setNewRole(300)}
          />
        </Grid>
      </Grid>
    </DialogModal>
  );
};

export default SetRoleModal;
