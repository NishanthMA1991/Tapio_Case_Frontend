import "./App.css";
import Posts from "./post/Posts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddPost from "./post/AddPost";
import { DataContext } from "./context/DataContext";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { useContext } from "react";
import EditPost from "./post/EditPost";
import LoginComponent from "./login/Login";

function App() {
  const dataContext = useContext(DataContext);

  return (
    <>
      <Router>
        <Routes>
          {dataContext.authUser && (
            <Route path="/posts" element={<Posts />}>
              <Route path="add/modal" element={<AddPost />} />
              <Route path="edit/modal/:id" element={<EditPost />} />
            </Route>
          )}

          <Route path="/" element={<LoginComponent />} />
          <Route
            path="*"
            element={
              dataContext.authUser ? (
                <Navigate to="/posts" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={dataContext.snackbar.open}
        autoHideDuration={6000}
        onClose={() =>
          dataContext.setSnackbar({ ...dataContext.snackbar, open: false })
        }
        message={dataContext.snackbar.message}
      >
        <Alert
          onClose={() =>
            dataContext.setSnackbar({ ...dataContext.snackbar, open: false })
          }
          severity={dataContext.snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {dataContext.snackbar.message}
        </Alert>
      </Snackbar>
      {dataContext.loading && (
        <Backdrop color="primary" open={dataContext.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default App;
