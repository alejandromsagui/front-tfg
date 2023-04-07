import axios from 'axios';

const users = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default{
    newUser(data){
        return users.post('newUser', data);
    }
}