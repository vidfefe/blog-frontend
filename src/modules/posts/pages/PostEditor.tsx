import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppDispatch } from "../../../app/store";
import { PostFormValues, postSchema } from "../../../schemas/post";
import { PostForm } from "../components/PostForm";
import {
  useCreatePostMutation,
  useFetchPostQuery,
  useUpdatePostMutation,
} from "../../../api/postsApi";
import { Loading } from "../../../shared/components/ui/Loading";
import NotFound from "../../../pages/NotFound";
import { showToast } from "../../../store/toastSlice";

import "easymde/dist/easymde.min.css";

const PostEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formMethods = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      tags: "",
      text: "",
      imageUrl: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = formMethods;

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useFetchPostQuery(id ?? "", { skip: !isEditing });

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  useEffect(() => {
    if (isEditing && post) {
      reset({
        title: post.title,
        text: post.text,
        tags: post.tags.join(","),
        imageUrl: post.imageUrl,
      });
    }
  }, [isEditing, post, reset]);

  const onSubmit = (values: PostFormValues) => {
    const tagsArray = values.tags
      ? values.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const payload = {
      ...values,
      tags: tagsArray,
    };

    if (isEditing) {
      updatePost({ id: id!, body: payload })
        .unwrap()
        .then(() => {
          navigate(`/post/${id}`);
          dispatch(
            showToast({
              message: "Post edited successfully!",

              severity: "success",
            })
          );
        })
        .catch(() => {});
    } else {
      createPost(payload)
        .unwrap()
        .then((res) => {
          navigate(`/post/${res.id}`);
          dispatch(
            showToast({
              message: "Post published successfully!",
              severity: "success",
            })
          );
        })
        .catch(() => {});
    }
  };

  if (isEditing && isPostLoading) {
    <Loading />;
  }

  if (isEditing && isPostError) {
    <NotFound />;
  }

  const isBusy = isSubmitting || isCreating || isUpdating;

  return (
    <PostForm
      formMethods={formMethods}
      onSubmit={onSubmit}
      isSubmitting={isBusy}
      isEditing={isEditing}
    />
  );
};

export default PostEditor;
