import React, { useState } from "react";
import { Avatar, Button, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAddComment } from "../../store/slices/postsSlice";
import { useParams } from "react-router";

const AddComment = () => {
  const [commentText, setCommentText] = useState<string>("");
  const userData = useSelector((state: RootState) => state.auth.data);

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { id } = params;

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async () => {
    if (commentText.trim()) {
      try {
        await dispatch(
          fetchAddComment({
            postId: id!,
            text: commentText,
          })
        );
        setCommentText("");
      } catch (error) {
        console.error("Failed to add comment", error);
      }
    }
    console.log(commentText);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 2 }}>
      <Avatar sx={{ width: 40, height: 40 }} src={userData?.avatarUrl} />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          label="Enter comment..."
          variant="outlined"
          multiline
          fullWidth
          value={commentText}
          onChange={handleCommentChange}
          maxRows={10}
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AddComment;
