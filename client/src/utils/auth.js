// src/utils/auth.js

// Store the token in local storage or session storage
export const login = (token) => {
  localStorage.setItem('id_token', token);
};

// Logout by removing the token
export const logout = () => {
  localStorage.removeItem('id_token');
};

// Check if the user is logged in by checking for a token
export const loggedIn = () => {
  const token = localStorage.getItem('id_token');
  return !!token;
};

// Get the token from local storage
export const getToken = () => {
  return localStorage.getItem('id_token');
};
