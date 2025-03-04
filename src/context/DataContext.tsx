import { ReactNode, createContext, useState } from "react";
import { Post } from "../post/postService";

interface Isnackbar {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

// Define the context type
interface MyDataContextType {
  posts: Post[];
  loading: boolean;
  authUser: boolean;
  snackbar: Isnackbar;
  setSnackbar: React.Dispatch<React.SetStateAction<Isnackbar>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthUser: React.Dispatch<React.SetStateAction<boolean>>;
}

// Rename DataContext to avoid conflicts
export const DataContext = createContext<MyDataContextType>({
  posts: [],
  snackbar: { open: false, message: "", severity: "success" },
  loading: false,
  authUser: false,
  setPosts: () => {},
  setSnackbar: () => {},
  setLoading: () => {},
  setAuthUser: () => {},
});

// Context Provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<boolean>(localStorage.getItem("auth") === 'true'? true : false);
  const [snackbar, setSnackbar] = useState<Isnackbar>({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        snackbar,
        setSnackbar,
        loading,
        setLoading,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
