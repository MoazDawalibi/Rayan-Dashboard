import { authStorage } from "utility/authStorage";

const normalUser = {
  user: {},
  token: "",
  isAuthenticated: false,
  isLoading: false,
};

const getInitialState = () => {
  const { user, token } = authStorage.get();

  if (user && token) {
    return {
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    };
  }
  return normalUser;
};

export const login = (state = getInitialState(), action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    }
    case "UPDATE": {
    
      return {
        ...state,
        user:{...action.payload.user}
          
      }
    }
    case "LOGOUT": {
      return normalUser;
    }
    case "START_LOGIN": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "END_LOGIN": {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
