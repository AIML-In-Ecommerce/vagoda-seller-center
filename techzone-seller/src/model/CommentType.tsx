export type CommentType = {
  _id: string | undefined;
  user: { _id: string; fullName: string; avatar: string };
  content: string;
  createdAt: string;
};

export type RawCommentType = {
  _id: string | undefined;
  comment: CommentType;
};
