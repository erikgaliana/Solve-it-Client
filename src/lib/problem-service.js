import axios from 'axios';

class Problem {
  constructor() {
    this.problem = axios.create({
      baseURL: process.env.REACT_APP_API_URL+"/",
      withCredentials: true,
    });
  }

  askProblem(category,description,pic, authorID ) {
    
    return this.problem
      .post('problems', { category, text : description,pic, authorID  })
      .then(({ data }) => data)
           
  }

  updateProblem(id,solution, category){
    console.log("category inside service",category);
    return this.problem
    .put((`problems/update/${id}`), { solution, category})
    .then(({ data }) => data)
         
      }

  deleteProblem(id,authorID, category){
        // console.log("value insiodde service",id);
        // console.log(authorID);
        // console.log(category);
        return this.problem
        .put((`problems/delete/${id}`), {authorID, category})
        .then(({ data }) => data)
             
          }

}


const problemService = new Problem();

export default problemService;