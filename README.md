# chat-api

a simple RESTful API backend for a mobile chat application built with Node.js and Express, with a MySQL database

**author:** Caitlin Grace Chan  
**time:** 10hrs

```
npm init -y
npm install express mysql2 dotenv jsonwebtoken
```

```
npm run start
```

## how it's made
1. Getting started. Created Git repo. Decided on frameworks. Set up the environment. 

2. Sorted out folder structure to keep the project organized and have a clear separation of logic. 

3. Designed an ERD to visualize entities and relationships (not pictured). Translated to schema for MySQL. I am using MySQL Workbench to manage the database and test during development. Configured MySQL connection. 

4. Implemented user controller/model/routes (roughly in that order). 

5. Implemented message controller/model/routes. This was more simple. 

6. To create the ```/list_all_users``` endpoint, I figured I'd need a way to identify who is logged in and making the request. Added JWT authentication. Realized I could use the same approach to support message endpoints too. Could alternatively have relied on the request body/params.. 

7. Tested along the way with ```curl``` commands with Git Bash. Also updated this README as a I went. However, the commits mostly reflect my step-by-step summary here. 

## on endpoint structure
The endpoint structure used here violates most [REST API name conventions](https://restfulapi.net/resource-naming/). Most of the endpoints are verbs but instead should be nouns. Underscores (```_```) should not be used for readability/accessibility, we should opt for dashes (```-```) instead. While its mostly GET-only, I like to think about [PokeAPI](https://pokeapi.co/) as a good example of clean RESTful desgin. 

## future improvements

### security
- Use ```bcrypt``` (or some other hashing method) to avoid storing passwords in plaintext. 
- Do more with JWT, HTTP-only cookies, or explore other options? 
- Protect against API abuse: spamming requests, SQL-injections, etc.
- Possibly use ```mysql2/promise``` over ```mysql2``` alone. 

### usability
- Create a front-end to more easily test and interact with the API. 
- WebSockets for sending messages in real-time? 
- Make necessary API design changes discussed below. 

### API design
- Follow REST API naming conventions to make the API easier to use and more predictable. 
- Using query vs. param for GET endpoints (for readability). 
- Include versioning in the path. Likely in the form of ```/api/v1/messages```. 
- Auth can also have its own paths ```/api/v1/auth/login```. 