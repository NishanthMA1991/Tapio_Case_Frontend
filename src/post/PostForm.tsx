import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Post } from "./postService";
import { useNavigate } from "react-router-dom";

interface PostFormProps {
  title: string;
  onSubmit: (data: Post) => void;
  existingData?: Post;
}

const PostForm = (props: PostFormProps) => {
  const { title, onSubmit, existingData } = props;

  const [data, setData] = useState<Post | undefined>(existingData);
  const navigate = useNavigate();

  return (
    <>
      <Dialog maxWidth="lg" fullWidth open={true}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          sx={{
            paddingTop: "8px !important",
            paddingBottom: "8px !important",
          }}
        >
          <form
            autoComplete="false"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              error={data && Object.keys(data).includes("title") && !data.title}
              id="title"
              label="Title"
              value={data?.title}
              variant="outlined"
              helperText={
                data && Object.keys(data).includes("title") && !data.title
                  ? "Title cannot be empty"
                  : ""
              }
              onChange={(event) => {
                setData({
                  ...data,
                  title: event?.target?.value?.trim() ? event.target.value : "",
                } as Post);
              }}
            />
            <TextField
              error={data && Object.keys(data).includes("body") && !data.body}
              id="body"
              label="Body"
              value={data?.body}
              variant="outlined"
              multiline
              rows={4}
              helperText={
                data && Object.keys(data).includes("body") && !data.body
                  ? "Body cannot be empty"
                  : ""
              }
              onChange={(event) => {
                setData({
                  ...data,
                  body: event?.target?.value?.trim() ? event.target.value : "",
                } as Post);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions sx={{ padding: " 24px 24px" }}>
          <Stack direction={"row"} gap={2}>
            <Button onClick={() => onSubmit(data as Post)} variant="contained">
              Submit
            </Button>
            <Button
              onClick={() => {
                navigate("/posts");
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostForm;
