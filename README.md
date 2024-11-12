## Description

A Dall-E Clone with search image function

## Live Deployment
Deploy on AWS EC2 (recommended): 

Live Demo: [AI Image Generator website](http://16.16.204.216:3000/) 

Deploy on render: 

Live demo:  [AI Image Generator website](https://ai-image-generator-1-1t4p.onrender.com/) 

The server is deployed [AI Image Generator Server](https://ai-image-generator-f5m8.onrender.com).

## Technologies 

Front End:
- React
- Tailwind

Back End: 
- Node.js
- Express
- Dall-e API
- Image Search API

Database:
- MongoDB
- Cloudinary

CI/CD:
- GitHub Actions
- AWS EC2
- Docker

Test:
- Jest

## NOTE

- The live demo may get a bit slow since it is a free plan

## Run Locally

- Clone the repository
- Set up `.env` file in `server` directory with the following content:

```bash
MONGODB_URL=<your_mongodb_url>
TEST_MONGODB_URI=<your_test_mongodb_url>
OPENAI_API_KEY=<your_api_key>
PORT=8080

CLOUDINARY_CLOUD_NAME=<user_name_from_cloudinary>
CLOUDINARY_API_KEY=<api_key_from_cloudinary>
CLOUDINARY_API_SECRET=<api_key_secret_from_cloudinary>
SEARCH_API_KEY=<api_key_secret_from_rapid_api>
SECRET=<your_random_code_to_use_jwt>

```

- Set up `.env` file in `client` directory with the following content:
```bash
VITE_PASSWORD = <your_password>

```

- Run `npm install` in both `client` and `server` directories
- Run `npm dev` in both `client` and `server` directories

## Timeline

Table:

| Date (Month.Day.Year) | Task | Labour (hours) |
| --- | --- | --- |
| 07.01.2024 | Searching MERN app idea and design | 1 |
| 07.02.2024 | Setting up environment, base code for frontend and backend | 1 |
| 07.03.2024 | Adding Home page route| 4 |
| 07.03.2024 | Adding Create post page route| 3 |
| 07.04.2024 | Create form field and add UI for create post page | 5 |
| 07.04.2024 | Adding logic for showing images and additional UI for create post page| 8 |
| 07.06.2024 | Adding functions for generating images in backend and frontend | 20 |
| 07.11.2024 | Adding UI for app and finishing UI for beta version | 20 |
| 07.13.2024 | Adding some tests and rest requests | 2 |
| 07.13.2024 | Setting Database and connect DB to the application | 2 |
| 07.14.2024 | Getting API from Open AI and connect to the application| 2 |
| 07.15.2024 | Fix frontend logic | 10 |
| 07.16.2024 | Fix bugs | 10 |
| 07.24.2024 | Adding paid api | 1 |
| 07.25.2024 | Setting up cloudinary and connect it to backend and frontend | 2 |
| 07.25.2024 | Releasing beta version 2.0 | 2 |
| 07.26.2024 | Fixing backend routes for production | 2 |
| 08.06.2024 | Deploy on Render and Create READ.md | 2 |
| 08.19.2024 | Adding general logic for controlling generating button (security issuses) | 15 |
| 08.20.2024 | Saving the usage limit to local storage | 5 |
| 08.21.2024 | Improving saving the usage limit from local storage to mongodb | 6 |
| 08.23.2024 | Fixing logic to control limit per reset and finalize for final product | 6 |
| **Total** | | **129** |


Additional Table: 

| Date (Month.Day.Year) | Task | Labour (hours) |
| --- | --- | --- |
| 09.13.2024 | Add functions (post, get requests, show paswword, middleware ..) for login and register form 6 and add UI for login and register form 3 | 9 |
| 09.14.2024 | Add services change from using fetch to axios, fix some requests for dalle, post, user 1hr | 1 |
| 09.15.2024 | Add user exactor and add logic handling requests | 3 |
| 09.17.2024 | Add saving post created by user 5 | 5 |
| 09.18.2024 | changed the logic of saving lovedPosts and ccreatedPosts which helps to optimize the running -> only need to get the user once time to get all information instead of saving in posts - 3 | 3 |
| 10.24.2024 | fix and implement ci cd | 2 |
| 10.25.2024 | add unlove and love function 5hrs | 5 |
| 10.26.2024 | created two devlopment and production stage, unify the json for user 3hrs | 3 |
| 10.28.2024 | add one search image engine 7hrs | 7 |
| 10.29.2024 | avoid wasting resource in cloudinary, fix size to 256 x 256, improve ui 2hrs | 2 |
| 11.3.2024 | add static test 1hrs | 1 |
| 11.4.2024 | add check token for search and generate engine and fix logic 2 | 2 |
| 11.5.2024 | fix minor 2hr | 2 |
| 11.8.2024 | add tests to ci/cd 3hr | 3 |
| **Total** | | **48** |
## References

## CI/CD Pipeline
<img width="1347" alt="Screenshot 2024-11-12 at 18 24 02" src="https://github.com/user-attachments/assets/1236db0f-7fdd-4bb0-8c7a-8dd94857c176">

## Demo Image 

<img width="1429" alt="Screenshot 2024-11-12 at 18 37 02" src="https://github.com/user-attachments/assets/a4ee624b-d0a3-4d82-9c7b-bef7c92090aa">

<img width="1435" alt="Screenshot 2024-11-12 at 18 37 31" src="https://github.com/user-attachments/assets/dd66c2c2-9cf0-447c-b075-cdc59ca04e57">

<img width="1440" alt="Screenshot 2024-11-12 at 18 38 07" src="https://github.com/user-attachments/assets/59e0fc10-7309-4eb8-894c-12862ab5ed51">

<img width="1440" alt="Screenshot 2024-11-12 at 18 37 56" src="https://github.com/user-attachments/assets/97d4eb70-10d9-4d69-b224-2df381a3cfed">


Learning from this tutorial [youtube video](https://youtu.be/EyIvuigqDoA?si=NH10NSRkPWe-41lh)
