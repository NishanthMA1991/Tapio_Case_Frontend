import { Card, CardContent, Typography, Button, Stack, IconButton } from "@mui/material";
import { Post } from "./postService";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IPostCard {
  index: number;
  post: Post;
  onPostDelete: (post: Post)=> void
}

const PostCard = (props: IPostCard) => {
  const navigate = useNavigate();

  return (
    <Card
      id={"Card_" + props.index}
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        height: "270px",
        overflow: "auto",
      }}
    >
      <CardContent>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <Button
          onClick={() => {
            navigate("edit/modal/" + props.post.id);
          }}
          size="small"
          sx={{ mb: 1 }}
          variant="outlined"
          color="primary"
          disabled={props.post.id === 101}
        >
          {props.post.id === 101
            ? "Edit is disabled as limitaion in JSONPlaceholder "
            : "Edit"}
        </Button>
        <IconButton onClick={()=> {
          props.onPostDelete(props.post)
        }}>
          <DeleteOutlineIcon color="primary" />
        </IconButton>
        </Stack>
        <Typography gutterBottom variant="h6" component="div">
          {props.post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
