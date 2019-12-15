import axios from 'axios';

class Answer {
  constructor() {
    this.answer = axios.create({
      baseURL: 'http://localhost:5000/',
      withCredentials: true,
    });
  }

  sendanswer(description,pic,category,problemtosolve,authorID) {
    
    return this.answer
      .post('answers', {  text : description,pic,category, problemtosolve, author : authorID  })
      .then(({ data }) => data)
           
  }


  

}



const answerService = new Answer();

export default answerService;