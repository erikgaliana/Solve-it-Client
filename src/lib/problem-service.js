import axios from 'axios';

class Problem {
  constructor() {
    this.problem = axios.create({
      baseURL: 'http://localhost:5000/',
      withCredentials: true,
    });
  }

  askproblem(category,description,pic, authorID ) {
    
    return this.problem
      .post('problems', { category, text : description,pic, authorID  })
      .then(({ data }) => data)
           
  }

  // updateproblem(solution, answerauthorId){
  //   return this.problem
    
  //   .put((`problems/update/${id}`), { solution, answerauthorId})
  //   .then(({ data }) => data)
         
  //     }


 // }
  

}



const problemService = new Problem();

export default problemService;