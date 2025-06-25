import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchPosts, fetchTags } from "../store/slices/postsSlice";
import { useSelector } from "react-redux";
import { Grid, Tab, Tabs } from "@mui/material";
import Post from "../components/Post/Post";
import TagBlock from "../components/TagBlock";
import PostSkeleton from "../components/Post/Skeleton";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.data);
  const { posts, tags } = useSelector((state: RootState) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    const sortType = tabIndex === 0 ? "new" : "popular";
    dispatch(fetchPosts(sortType));
    dispatch(fetchTags());
  }, [dispatch, tabIndex]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="Post tabs">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={2}>
            {(isPostsLoading ? [...Array(5)] : posts.items).map(
              (post, index) => (
                <Grid
                  size={{ xs: 12, md: 6 }}
                  key={isPostsLoading ? index : post._id}
                >
                  {isPostsLoading ? (
                    <PostSkeleton />
                  ) : (
                    <Post
                      post={post}
                      isFullPost={false}
                      isEditable={userData?._id === post?.user?._id}
                    />
                  )}
                </Grid>
              )
            )}
          </Grid>
        </Grid>
        <Grid size={{ xs: 3, md: 3 }}>
          <TagBlock tags={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
