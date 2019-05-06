import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

const http = {
  get(repo, param) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + repo, { params: param })
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch(error => {
          return resolve(error);
        });
    });
  },

  post(repo, param) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + repo, param)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch(error => {
          return resolve(error);
        });
    });
  }
};

export default http;
