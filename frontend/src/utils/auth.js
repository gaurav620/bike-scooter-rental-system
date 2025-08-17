import { jwtDecode } from 'jwt-decode';


export const getUser = () => {
  const token = localStorage.getItem('token');
  if (token) return jwtDecode(token);
  return null;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};