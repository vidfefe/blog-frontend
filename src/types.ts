export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
}

export interface PostType {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  tags: string[];
  viewsCount: number;
  commentsCount: number;
  comments: Comment[];
  imageUrl: string;
  user: UserType;
}

export interface Comment {
  _id?: string;
  text: string;
  user: UserType;
  createdAt: string;
}

export type ToastSeverity = "success" | "error" | "info" | "warning";
