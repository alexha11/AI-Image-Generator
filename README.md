# AI Image Generator

## Description

An application has two main functions, each serving a specific page:

- Create Post Page: Allows users to generate images based on their prompts and share them with the community.
- Main Page: Allows users to search for, view, react to, and download images from the community.
  
## Technologies 

Front End:
- React
- Tailwind

Back End: 
- Node.js
- Express
- OpenAI's DALL-E model

Database 
- MongoDB
- Cloudinary

## Live Deployment

Live demo:  [AI Image Generator website](https://ai-image-generator-1-1t4p.onrender.com/) 

The server is deployed [AI Image Generator Server](https://ai-image-generator-f5m8.onrender.com).

Image Demo: 

<img width="1413" alt="Screenshot 2024-08-24 at 16 54 05" src="https://github.com/user-attachments/assets/7ec4083c-9c16-46c5-89b4-a16fe2fe3c5a">
<img width="1422" alt="Screenshot 2024-08-24 at 16 53 38" src="https://github.com/user-attachments/assets/62082290-004a-4137-b5bf-56b591bf0632">


## NOTE

- The live demo may get a bit slow since it is a free plan
- Users can generate images up to 5 times. Only an admin with the password can reset this limit. Can be found at the bottom of the Creat Post page. (Prevent DDOS attack)

## Run Locally

- Clone the repository
- Set up `.env` file in `server` directory with the following content:

```bash
MONGODB_URL=<your_mongodb_url>
OPENAI_API_KEY=<your_api_key>
PORT=8080

CLOUDINARY_CLOUD_NAME=<user_name_from_cloudinary>
CLOUDINARY_API_KEY=<api_key_from_cloudinary>
CLOUDINARY_API_SECRET=<api_key_secret_from_cloudinary>

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


## References

Learning from this tutorial [youtube video](https://youtu.be/EyIvuigqDoA?si=NH10NSRkPWe-41lh)
