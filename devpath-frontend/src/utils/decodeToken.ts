import jwt_decode from 'jwt-decode';

type DecodedToken = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  exp: number;
  iat: number;
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwt_decode(token);
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
};
