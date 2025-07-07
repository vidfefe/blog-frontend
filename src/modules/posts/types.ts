import { User } from "../auth/types";
import { Comment } from "../comments/types";

export interface Post {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  viewsCount: number;
  likesCount: number;
  isLikedByMe: boolean;
  comments: Comment[];
  imageUrl: string;
  user: User;
}
