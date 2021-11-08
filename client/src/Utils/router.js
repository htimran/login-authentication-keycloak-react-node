import axios from 'axios';
import { CONSTANT_VARIABLE } from '../config/keys';


export const getUser = setUserAvailable => {
  axios.get('/user/').then(res => {
    if (res.data.status === 200) {
      setUserAvailable(true);
    } else {
      setUserAvailable(false);
    }
  }).catch(err => console.log(err))
}

export const createUser = (url, data) => {
  axios.post(CONSTANT_VARIABLE.BASE_URL + url, { data }).then(resp => {
    if (resp.status === 200) {
      window.location.href = '/sign-in';
      return true;
    } else {
      return false;
    }
  }).catch(err => {
    console.log(err)
  });
};

export const loginUser = (url, data) => {
  axios({
    method: "POST",
    data: {
      username: data.username,
      password: data.password,
    },
    withCredentials: true,
    url: CONSTANT_VARIABLE.BASE_URL + url,
  }).then(resp => {
    if (resp.status === 200) {
      window.location.href = '/dashboard';
      return true;
    } else {
      return false;
    }
  }).catch(err => {
    console.log(err)
  });
}
