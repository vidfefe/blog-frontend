import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../../app/store";
import { hideToast } from "../../../store/toastSlice";

const Toast = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, severity, open } = useSelector(
    (state: RootState) => state.toast
  );

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
