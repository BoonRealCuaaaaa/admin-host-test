export const AUTH_KEY = {
   TOKEN: "app_token",
};

export const setToken = (token: string) => {
   localStorage.setItem(AUTH_KEY.TOKEN, token);
};

export const getToken = () => {
   return localStorage.getItem(AUTH_KEY.TOKEN);
};
