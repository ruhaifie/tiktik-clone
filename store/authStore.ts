//zustand, alternative react state management
//https://zustand-demo.pmnd.rs/
import create from 'zustand';
import { persist } from 'zustand/middleware';

//axios
import axios from 'axios';

import { BASE_URL } from '../utils';

//typescipt type : any, means can be everything
const authStore = (set: any) => ({
  //null at start
  userProfile: null,
  allUsers: [],
  
  //function
  //call set from above 1st param. set userProfile as user
  addUser: (user: any) => set({ userProfile: user }),
  //logout, use at navbar.tsx
  removeUser: () => set({ userProfile: null }),

  //function
  fetchAllUsers: async () => {
    //axios reponse
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create((
  //persist import from zustand 
  persist(authStore, {
    name: 'auth',
  })
));

export default useAuthStore;
