import axios from 'axios';

const http = {
  get(repo, param) {
    return new Promise((resolve, reject) => {
      axios.get(repo, param)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        return resolve(error);
      })
    })
  },

  post(repo, param) {
    return new Promise((resolve, reject) => {
      axios.post(repo, param)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        return resolve(error);
      })
    })
  }
}

export default http;
