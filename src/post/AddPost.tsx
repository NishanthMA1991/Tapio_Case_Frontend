import { useContext } from "react";
import PostForm from "./PostForm";
import { Post, createPost } from "./postService";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const AddPost = () => {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const onSubmit = async (data: Post) => {
    try {
      dataContext.setLoading(true);
      const newPost = await createPost({
        title: data.title,
        body: data.body,
        userId: 1,
      });
      const clonedPost = [...dataContext.posts];
      clonedPost.unshift(newPost);

      dataContext.setPosts([...clonedPost]);
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Post added successfully",
        severity: "success",
      });
      navigate("/posts");
      //   setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Error while adding post",
        severity: "error",
      });
    } finally {
      dataContext.setLoading(false);
    }
  };

  return <PostForm title={"Add Post"} onSubmit={onSubmit} />;
};

export default AddPost;
