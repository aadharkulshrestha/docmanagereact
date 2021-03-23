import http from "./httpService";

// const apiEndpoint = "http://192.168.1.41:8080";
const apiEndpoint = "http://localhost:8080";

/***************************************************************/
function getSignUpAddress() {
  return apiEndpoint + "/signup";
}

function getSigninAddress() {
  return apiEndpoint + "/signin";
}

/***************************************************************/
http.setJwt(getJwt());

export function getJwt() {
  if (localStorage.getItem("user")) return localStorage.getItem("user");
}

export async function register(username, email, password) {
  return http.post(getSignUpAddress(), {
    username,
    email,
    password,
  });
}

const login = (username, password) => {
  return http
    .post(getSigninAddress(), {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
  register,
};
