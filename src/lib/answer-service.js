import axios from 'axios';

class Answer {
  constructor() {
    this.answer = axios.create({
      baseURL: process.env.REACT_APP_API_URL+"/",
      withCredentials: true,
    });
  }

  sendAnswer(description,pic,category,problemtosolve,authorID) {
    
    return this.answer
      .post('answers', {  text : description,pic,category, problemtosolve, author : authorID  })
      .then(({ data }) => data)
           
  }


  

}



const answerService = new Answer();

export default answerService;