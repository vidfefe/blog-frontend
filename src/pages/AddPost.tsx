import { Paper, Stack, TextField, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { showToast } from "../store/slices/toastSlice";

const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fieldsData, setFieldsData] = useState({
    title: "",
    tags: "",
    text: "",
    imageUrl: null as File | null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isEditing = !!id;

  const onChange = useCallback(
    (value: string) => {
      setFieldsData({ ...fieldsData, text: value });
    },
    [fieldsData]
  );

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFieldsData({ ...fieldsData, [field]: value });
    },
    [fieldsData]
  );

  const handleRemoveImage = () => {
    setFieldsData({ ...fieldsData, imageUrl: null });
  };

  const handleImageChange = useCallback(async () => {
    try {
      const file = inputFileRef.current?.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file!);

      const { data } = await axios.post("/upload", formData);
      setFieldsData({ ...fieldsData, imageUrl: data.url });
      dispatch(
        showToast({
          message: "Image uploaded successfully!",
          severity: "success",
        })
      );
    } catch (err) {
      console.warn(err);
      dispatch(
        showToast({ message: "Error uploading image", severity: "error" })
      );
    }
  }, [fieldsData, dispatch]);

  const onSubmit = async () => {
    try {
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fieldsData)
        : await axios.post("/posts", fieldsData);

      const _id = isEditing ? id : data._id;

      dispatch(
        showToast({
          message: isEditing
            ? "Post edited successfully!"
            : "Post published successfully!",
          severity: "success",
        })
      );

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      dispatch(
        showToast({
          message: isEditing ? "Error editing post" : "Error publishing post",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setFieldsData({
            title: data.title,
            text: data.text,
            tags: data.tags.join(","),
            imageUrl: data.imageUrl,
          });
        })
        .catch((err) => {
          console.warn(err);
          dispatch(
            showToast({ message: "Error receiving post", severity: "error" })
          );
        });
    }
  }, [dispatch, id]);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "post_content",
      },

      toolbarTips: true,
      sideBySideFullscreen: false,
    }),
    []
  );

  if (!isAuth) return <Navigate to="/" />;

  console.log(fieldsData);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, my: 2, p: 2 }}>
      <Stack sx={{ mb: 2 }}>
        <Button
          size="large"
          onClick={() => inputFileRef.current?.click()}
          variant="outlined"
        >
          Add preview
        </Button>
        <input
          ref={inputFileRef}
          onChange={handleImageChange}
          type="file"
          hidden
        />
        {fieldsData.imageUrl && (
          <Button variant="contained" color="error" onClick={handleRemoveImage}>
            Remove preview
          </Button>
        )}
      </Stack>

      {fieldsData.imageUrl && (
        <img
          src={`http://localhost:8000${fieldsData.imageUrl}`}
          alt="Uploaded"
        />
      )}

      <TextField
        variant="standard"
        placeholder="Enter title..."
        fullWidth
        value={fieldsData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        sx={{
          "& .MuiInput-underline:before, & .MuiInput-underline:after": {
            borderBottom: "none",
          },
          "& input": {
            fontSize: "30px",
          },
          "& .MuiInput-underline:hover:before, & .MuiInput-underline:hover:after":
            {
              display: "none",
            },
        }}
      />
      <TextField
        variant="standard"
        placeholder="Tags"
        value={fieldsData.tags}
        fullWidth
        onChange={(e) => handleInputChange("tags", e.target.value)}
        sx={{
          "& input": {
            fontSize: "20px",
          },
        }}
      />
      <SimpleMdeReact
        id="editor"
        value={fieldsData.text}
        onChange={onChange}
        options={options}
        style={{
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 600,
        }}
      />
      <Stack>
        <Button onClick={onSubmit} variant="contained">
          {isEditing ? "Save" : "Publish"}
        </Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default AddPost;
