import React, { FC, useContext, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const LoginComponent: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const email = 'test@test.com'
  const password = '12345'
  const [error, setError] = useState("");
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    if(formData.email === email && formData.password === password) {
      //TODO: will make API call from here
      localStorage.setItem("auth", "true");
      dataContext.setAuthUser(true)
      navigate('/posts')
    } else {
      setError("Incorrect Credentials..!");
      return;
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            required={true}
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            helperText={'Hint : '+email}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required={true}
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            helperText='Hint : 12345'
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            disabled={!formData.email || !formData.password}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginComponent;
