const PREFIX = "URUK_ADMIN";
const TOKEN_KEY = `${PREFIX}_TOKEN`;
const USER_KEY = `${PREFIX}_USER`;

//================ TOKEN =====================
const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

//================ USER =====================
const storeUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};
const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

//================ BOTH =====================
const store = (user, token) => {
  storeUser(user);
  storeToken(token);
};
const remove = () => {
  removeToken();
  removeUser();
};
const get = () => {
  return {
    user: getUser(),
    token: getToken(),
  };
};

//================ EXPORT =====================
export const authStorage = {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  removeUser,
  store,
  remove,
  get,
};
