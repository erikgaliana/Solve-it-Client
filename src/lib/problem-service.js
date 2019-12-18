import axios from 'axios';

class Problem {
  constructor() {
    this.problem = axios.create({
      baseURL: process.env.REACT_APP_API_URL+"/",
      withCredentials: true,
    });
  }

  askproblem(category,description,pic, authorID ) {
    
    return this.problem
      .post('problems', { category, text : description,pic, authorID  })
      .then(({ data }) => data)
           
  }

  updateproblem(id,solution, answerauthorId){
    
    return this.problem
    .put((`problems/update/${id}`), { solution, answerauthorId})
    .then(({ data }) => data)
         
      }

  deleteproblem(id,authorID, category){
    
        return this.problem
        .put((`problems/delete/${id}`), { authorID, category})
        .then(({ data }) => data)
             
          }

}


const problemService = new Problem();

export default problemService;