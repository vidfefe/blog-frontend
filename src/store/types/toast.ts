import { ToastSeverity } from "../../shared/types";

export interface ToastState {
  message: string;
  severity: ToastSeverity;
  open: boolean;
}
