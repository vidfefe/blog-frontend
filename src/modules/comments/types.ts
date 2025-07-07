import { User } from "../auth/types";

export interface Comment {
  id: string;
  text: string;
  user: User;
}
