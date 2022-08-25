import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//adduser from authStore.ts *zustand. receive/accept prop from navbar.tsx
export const createOrGetUser = async (response: any, addUser: any) => {
  var base64Url = response.credential.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  const { name, picture, sub } = JSON.parse(jsonPayload)
  
  const user = {
    //every single sanity doc have _ 
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  //persist state from zustand: when reload user still there
  addUser(user);

  //pass data with request
  await axios.post(`${BASE_URL}/api/auth`, user);
};

/**

console.log(response.credential) *from createOrGetUser to get jwt
const decode = jwt_decode(response.credential)  *using jwt-decode, to view the object & its properties fetch after login
object contain pic url, email, name etc. sub as unique identifier

*/