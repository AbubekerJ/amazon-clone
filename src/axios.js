// import axios from "axios";

// const Instance =axios.create({
//     baseURL: 'http://127.0.0.1:5001/clone-ecbdc/us-central1/api', //THE API {CLOUD FNCTION } URL
    
// })


// export default Instance;


import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});

// http://localhost:5000/

export default instance;


