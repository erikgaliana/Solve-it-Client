import axios from 'axios';

class User {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_API_URL+"/",
      withCredentials: true,
    });
  }

  // getAll() {
  //   return this.example
  //             .get()
  //             .then(({ data }) => data);
  // }

  getOneById(id) {
    return this.user
              .get(`users/${id}`)
              .then(({ data }) => data);
  }



  updateUser(id,userId ) {
    
    return this.user
      .put((`users/${id}`), { userId  })
      .then(({ data }) => data)
           
  }


}



const userService = new User();

export default userService;
