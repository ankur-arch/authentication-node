# authentication-node
## A jwt based Authetication flow implemented in Nodejs.  
```run npm install ``` 
#### Then use ```nodemon``` to start up development server 

#### Routes
  - ###### /users/signup/
    - pass email and password in request body
    1. Creates a collection in your mongo database 
    2. The password is hashed before storage 
    3. A token is signed 
      
      example : 
      ```
       {
            "email" : "google@gmail.com",
            "password" : "password"
       }
      ```
     returns the token as a response

  - ###### /users/signin/
    - pass email and password in request body
      example : 
      ```
       {
            "email" : "google@gmail.com",
            "password" : "password"
       }
      ```
     returns the token as a response

  - ###### /users/secret/
    - pass a  header called ```token : {the generated jwt token}```
     example : 
     returns success message as a reponse 
