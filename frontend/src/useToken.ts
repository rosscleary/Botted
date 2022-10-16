import { useState } from 'react';

const useToken = () => {
  const getToken = (): string => {
    const tokenString = sessionStorage.getItem('token');
    if (!tokenString) {
      return '';
    }
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    getToken: getToken,
  };
};

export default useToken;
