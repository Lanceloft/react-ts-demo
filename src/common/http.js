import axios from "axios";

const http = {
  get(repo, param) {
    return new Promise((resolve, reject) => {
      axios
        .get(repo, { params: param })
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
        .post(repo, param)
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
