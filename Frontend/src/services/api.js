import axios from "axios";

const API = axios.create({
  baseURL: "https://ats-backend-3g4x.onrender.com/api"
  
});

export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api"
// });

// export default API;

