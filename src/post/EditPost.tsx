import { useContext, useEffect, useState } from "react";
import PostForm from "./PostForm";
import { Post, getPostById, updatePost } from "./postService";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const EditPost = () => {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [existingData, setExistingData] = useState<Post>();
  let { id } = useParams();

  useEffect(() => {
    getData();
  }, []);
  const onSubmit = async (data: Post) => {
    try {
      dataContext.setLoading(true);
      const newPost = await updatePost(data.id, {
        ...existingData,
        title: data.title,
        body: data.body,
      });
      const clonedPost = dataContext.posts.map((post) => {
        if (post.id === existingData?.id) {
          post.title = data.title;
          post.body = data.body;
        }
        return post;
      });

      dataContext.setPosts([...clonedPost]);
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Post updated successfully",
        severity: "success",
      });
      navigate("/posts");
    } catch (error) {
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Error while updating post",
        severity: "error",
      });
    } finally {
      dataContext.setLoading(false);
    }
  };

  const getData = async () => {
    try {
      dataContext.setLoading(true);
      const data = await getPostById(id || "");
      setExistingData(data);
    } catch (error) {
      dataContext.setSnackbar({
        ...dataContext.snackbar,
        open: true,
        message: "Error while fetching post",
        severity: "error",
      });
      navigate("/posts");
    } finally {
      dataContext.setLoading(false);
    }
  };

  return (
    <>
      {existingData ? (
        <PostForm
          title={"Add Post"}
          onSubmit={onSubmit}
          existingData={existingData}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default EditPost;
