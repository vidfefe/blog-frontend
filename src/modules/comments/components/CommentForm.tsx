import { Avatar, Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";

interface CommentFormProps {
  avatarUrl?: string;
  placeholder?: string;
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
  initialValue?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export const CommentForm: FC<CommentFormProps> = ({
  avatarUrl,
  placeholder = "Enter comment...",
  onSubmit,
  isLoading = false,
  initialValue = "",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onCancel,
}) => {
  const [text, setText] = useState(initialValue);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim())
      .then(() => {
        setText("");
      })
      .catch(() => {});
  };
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 2 }}>
      <Avatar sx={{ width: 40, height: 40 }} src={avatarUrl} />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          variant="outlined"
          multiline
          minRows={2}
          maxRows={10}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
        >
          {submitLabel}
        </Button>
        {onCancel && (
          <Button
            variant="outlined"
            onClick={() => {
              setText(initialValue);
              onCancel();
            }}
            disabled={isLoading}
            sx={{ marginLeft: 1 }}
          >
            {cancelLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};
