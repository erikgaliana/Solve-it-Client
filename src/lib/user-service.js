import axios from 'axios';

class User {
  constructor() {
    this.user = axios.create({
      baseURL: 'http://localhost:5000/users',
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
              .get(`/${id}`)
              .then(({ data }) => data);
  }
}

// examplesService.getAll()
//   .then( (response) => response.data )
//   .catch( (err) => console.log(err));

// examplesService.getOneById( idString )
//   .then( ( { data } ) => data)
//   .catch( (err) => console.log(err));

const userService = new User();

export default userService;
