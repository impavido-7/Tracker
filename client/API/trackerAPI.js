import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  // Your baseURL goes here
  baseURL: 'http://e9bf-2409-4070-4785-e25b-1524-2721-8d-152b.ngrok.io'
});


/*
  Here we are setting the headers "Authorization" with the token that is presen
*/
instance.interceptors.request.use(
  // The first function will be called whenever the request is successful
  async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    
    /* 
      The second function is called when there is an error while making a request like 
      internet issues
    */
    (err) => {
      return Promise.reject(err);
    }
);

export default instance;