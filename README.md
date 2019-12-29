# SOLVE IT - module 3

<br>

## Description

Solve it, it's a social network where users can post problems and other users that are experts in problem's subject can propose answers to solve it. Users can post problems anb post solutions to other users problems as an experts in that problem's subject.

<br>

## User Stories

- **404** -  As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **landing** - As a user I want to be able to access the landing page and login/sign up.
- **sign up**  - As a user I want to sign up on the web page so I can post problems to get solved or solve problems from my expertise area.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **homepage** - As a user I want to read my Problems and check if they have answers. 
- **ask problem**  - As a user I want to be able to add problems to the app so Experts can solve it.
- **read answers**  - As a user I want to click on one problem and read the answers posted by Experts.
- **answer**  - As a user I want to click  on one answer to get all details, then I can validate it adding it to my solutions stored in user's profile or discard it.
- **problems to solve** - As a user I want to see all problems about my expertise area that users post.
- **problem** - As a user I want to see a problem details and propose an answer to solve it.
- **profile** - As a user I want to see  my problems solved and my user data.
- **edit profile** - As a user I want to be able to edit my profile.



<br>

# Client / Frontend

## 

## Routes (React App)

| Path                                | Component                   | Permissions | Behavior                                                     |
| ----------------------------------- | --------------------------- | ----------- | ------------------------------------------------------------ |
| `/`                                 | SplashPage                  | public      | Landing page                                                 |
| `/signup`                           | SignupPage                  | anon only   | Signup form, link to login, navigate to problemslistpage after signup |
| `/login`                            | LoginPage                   | anon only   | Login form, link to signup, navigate to problemslistpage after login |
| `/logout`                           | n/a                         | anon only   | Navigate to homepage after logout, expire session            |
| `/myproblems`                       | ProblemsListPage            | user only   | Shows all User's problems in a list                          |
| `/myproblems/add`                   | ProblemAddPage              | user only   | Adds a User'sProblem                                         |
| `/myproblems/:id`                   | ProblemDetailPage           | user only   | Details of selected Problem and proposed Answers             |
| `/myproblems/answer/:id`            | AnswerDetailPage            | user only   | Details of Answer proposed to user's problem                 |
| `/myproblems/tosolve`               | ProblemstoSolveListPage     | user only   | Shows all user's problems to solve in a list                 |
| `/myproblems/tosolve/:id`           | ProblemtoSolveDetailPage    | user only   | Shows all user's problems to solve in a list                 |
| `/myproblems/tosolve/:id/addanswer` | ProblemtoSolveAddAnswerPage | user only   | Adds an Answer to Problem to Solve.                          |
| `/profile`                          | ProfilePageComponent        | user only   | See user's profile data and User's problems solved list.     |
| `/edit-profile`                     | EditProfilePageComponent    | user only   | Form to update the user's data                               |



## Components

- SplashPage
- LoginPage
- SignupPage
- MyProblemsListPage
- OneProblemCard
- MyProblemAddPage
- ProblemDetailPage
- OneAnswerCard
- AnswerDetailPage
- ProblemstoSolveListPage
- ProblemtoSolveAddAnswerPage
- ProfilePageComponent
- EditProfilePageComponent
- Navbar



## Pages

- Landing Page.

- Sign in Page (anon only)

- Log in Page (anon only)

- MyProblems List Page (user only)

- MyProblem Detail Page (user only)

- MyProblem Answer Detail Page (user only)

- Add new User's Problem (user only)

- User's list of Problems to solve (user only)

- User's Problem to solve Detail Page (user only)

- My Profile Page (user only)

- MyProblem Solved Detail Page

- Edit User's Profile Page (user only)

- 404 Page (public)

  

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
- Problem Service
  - Problem.askProblem ( data )  
  - Problem.updateproblem ( id, {solution: answerId}, category )
  - Problem.deleteproblem ( id, authorID, category ) 
- Answer Service
  - Answer.sendanswer(data) 
- User Service
  - User.edit(id, data)
  - User.update(id, data)
  - User Service
  
- Cloudinary Service
  - Cloudinary.imageUpload ( imageFile )

# Server / Backend

## Models

User model

```javascript
{
  name : String,
  email : String unique,
  password : String,
  picture : String,
  expert-field : String,
  points : Number,
  myproblems: [problemId],
  problemstosolve: [problemId],
  myproblemsolved: [problemId]
}

```



Problems model

```javascript
{
  text: String,
  author : userId,
  pic : String,
  problem-answers : [answerId],
  solution : answerId,
  category : String
}

```

Answers model

```javascript
{
  text : String,
  author : userId,
  pic : String,
  problem-to-solve : problemId,
  category: String
}

```



<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                    | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                   | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password, expert} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         | (empty)                         | 204            | 400          | Logs out the user                                            |
| POST        | `/problems`            | {}                              | 201            | 400          | Create and save a new problem                                |
| PUT         | `/problems/update/:id` | {text,problem,img}              | 200            | 400          | Update problem status                                        |
| DELETE      | `/problems/delete/:id` | {id}                            | 201            | 400          | delete user's problem( BACKLOG)                              |
| POST        | `/answers`             | {text,author,img}               | 200            | 404          | add answer to a specific problem to solve.                   |
| DELETE      | `/answers/delete/:id`  | {id}                            | 200            | 400          | delete answer ( BACKLOG)                                     |
| PUT         | `/users/:id`           | {user}                          |                |              | edit user profile                                            |
| PUT         | `/users/updateOne:id`  | {key: data}                     |                |              | edit one specific data in user profile                       |







<br>



## Links



### GitHub

[Client Repository](https://github.com/erikgaliana/Solve-it-Client)

[Server Repository](https://github.com/erikgaliana/Solveit-server-v2)

[Deploy Link](https://solveitapp.herokuapp.com/)



<br>



### Slides

[Slides Link](https://docs.google.com/presentation/d/1EMXLbaZ9w-EUtdVOb-lHWrEL6W_3imFUzu1hxSstYQg/edit#slide=id.gc6f80d1ff_0_5)