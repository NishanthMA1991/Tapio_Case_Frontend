import api from "../api";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface getPostsProps {
  _start: number;
  _limit?: number;
}
// Fetch all posts
export const getPosts = async ({
  _start = 0,
  _limit = 20,
}: getPostsProps): Promise<Post[]> => {
  const response = await api.get<Post[]>(
    `/posts?_start=${_start}&_limit=${_limit}`
  );
  return response.data;
};

// Fetch a user by ID
export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

// Create a new user
export const createPost = async (post: Partial<Post>): Promise<Post> => {
  const response = await api.post<Post>("/posts", JSON.stringify(post));
  return response.data;
};

// Update a user
export const updatePost = async (
  id: number,
  post: Partial<Post>
): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, post);
  return response.data;
};

// Delete a user
export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
