import { useState } from "react";
import { Grid, Pagination, Stack } from "@mui/material";
import { useSelector } from "react-redux";

import TagBlock from "../modules/posts/components/TagBlock";
import { PostTabs } from "../modules/posts/components/PostTabs";
import { PostsGrid } from "../modules/posts/components/PostsGrid";
import { useFetchPostsQuery, useFetchTagsQuery } from "../api/postsApi";
import { selectCurrentUser } from "../store/authSlice";

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const sort = tabIndex === 0 ? "new" : "popular";

  const [page, setPage] = useState<number>(1);

  const { data: postsData, isLoading: isPostsLoading } = useFetchPostsQuery(
    { sort, page, limit: 4 },
    { refetchOnMountOrArgChange: true }
  );

  const { data: tags = [], isLoading: isTagsLoading } = useFetchTagsQuery();

  return (
    <>
      <PostTabs value={tabIndex} onChange={setTabIndex} />
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid size={{ xs: 12, md: 9 }}>
          <PostsGrid
            posts={postsData?.posts ?? []}
            isLoading={isPostsLoading}
            currentUserId={currentUser?.id}
          />
          {postsData && postsData.totalPages > 1 && (
            <Stack justifyContent="center" sx={{ mt: 2 }}>
              <Pagination
                size="large"
                count={postsData.totalPages}
                page={page}
                onChange={(_, newpage) => setPage(newpage)}
              />
            </Stack>
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mx: "auto" }}>
          <TagBlock tags={tags} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
