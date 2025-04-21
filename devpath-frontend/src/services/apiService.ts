import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};
