import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Post, deletePost, getPosts } from "./postService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PostCard from "./PostCard";
import { debounce } from "../utils";
import { Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { Close } from "@mui/icons-material";

const Posts = () => {
  const dataContext = useContext(DataContext);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetchData, setFetchData] = useState<boolean>(true);
  const [deleteModel, setdeleteModel] = useState<{
    flag: boolean;
    post: Post | null;
  }>({ flag: false, post: null });
  const [page, setPage] = useState<number>(0);
  const limit = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
    };
    fetchData();
  }, []); 

  // Infinite Scroll - Intersection Observer
  const lastUserRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (dataContext.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && hasMore && fetchData) {
          setFetchData(false)
          const newPage = page + limit;
          setPage(newPage); // Load next page
          await fetchPosts(page, limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [dataContext.loading, hasMore]
  );

  const fetchPosts = debounce(async (_start = 0, _limit = 10) => {
    try {
      dataContext.setLoading(true);
      const data = await getPosts({ _start, _limit });
      if (data.length === 0) setHasMore(false); // No more data available
      dataContext.setPosts([...dataContext.posts, ...data]);
      setFetchData(true)
    } catch (error) {
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Error while fetching posts",
        severity: "error",
      });
    } finally {
      dataContext.setLoading(false);
    }
  }, 300);

  const onPostDelete = async () => {
    try {
      dataContext.setLoading(true);
      setdeleteModel({
        flag: false,
        post: null,
      });
      await deletePost(deleteModel.post?.id?.toString() || "");
      const clonedPost = dataContext.posts.filter(
        (post) => post.id !== deleteModel.post?.id
      );
      dataContext.setPosts(clonedPost);
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Post deleted successfully",
        severity: "success",
      });
      setdeleteModel({
        flag: false,
        post: null,
      });
    } catch (error) {
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Error while deleting posts",
        severity: "error",
      });
    } finally {
      dataContext.setLoading(false);
    }
  };

  return (
    <Box m={2}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h3">Posts</Typography>
        <Stack display={"flex"} flexDirection={"row"} gap={1}>
          <Button
            onClick={() => {
              navigate("add/modal");
            }}
            variant="contained"
          >
            Add Post
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem("auth", "false");
              navigate("/");
            }}
            variant="text"
          >
            Logout
          </Button>
        </Stack>
      </Stack>
      <Box>
        <Grid container spacing={2} padding={2} ml={0}>
          {dataContext.posts.map((post, index) => (
            <Grid item key={"post_" + index} xs={12} sm={6} md={4} lg={3}>
              <Box
                ref={
                  index === dataContext.posts.length - 1 ? lastUserRef : null
                }
              >
                <PostCard
                  post={post}
                  index={index}
                  onPostDelete={(post: Post) => {
                    setdeleteModel({
                      flag: true,
                      post: post,
                    });
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Outlet />
      {deleteModel.flag && (
        <Dialog open={true} maxWidth="sm" fullWidth>
          <DialogTitle>Confirm the action</DialogTitle>
          <Box position="absolute" top={0} right={0}>
            <IconButton
              onClick={() => {
                setdeleteModel({
                  flag: false,
                  post: null,
                });
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <DialogContent>
            <Typography>{`Are you sure you want to delete post with title "${deleteModel.post?.title}"`}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setdeleteModel({
                  flag: false,
                  post: null,
                });
              }}
            >
              Cancel
            </Button>
            <Button color="error" variant="contained" onClick={onPostDelete}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Posts;
