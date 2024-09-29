import mongoose from "mongoose"
import supertest from "supertest"
import app from "../app"

import Post from "../mongodb/models/post"

const api = supertest(app)

beforeEach(async () => {
  await Post.deleteMany({})
  
  const posts = [
    {
      name: "post1",
      prompt: "prompt1",
      photo: "photo1",
      love: 0,
    },
    {
      name: "post2",
      prompt: "prompt2",
      photo: "photo2",
      love: 0,
    },
  ]
  const postObjects = posts.map(post => new Post(post))
  const promiseArray = postObjects.map(post => post.save())
  await Promise.all(promiseArray)
})

test("posts are returned as json", async () => {
  await api
    .get("/api/posts")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all posts are returned", async () => {
  const response = await api.get("/api/posts")
  expect(response.body).toHaveLength(2)
})


test("a specific post is within the returned posts", async () => {
  const response = await api.get("/api/posts")
  const contents = response.body.map(r => r.prompt)
  expect(contents).toContain("prompt1")
})

test("a valid post can be added", async () => {
  const newPost = {
    name: "post3",
    prompt: "prompt3",
    photo: "photo3",
    love: 0,
  }

  await api
    .post("/api/posts")
    .send(newPost)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const postsAtEnd = await Post.find({})
  expect(postsAtEnd).toHaveLength(3)

  const contents = postsAtEnd.map(r => r.prompt)
  expect(contents).toContain("prompt3")
})

test("post without prompt is not added", async () => {
  const newPost = {
    name: "post4",
    photo: "photo4",
    love: 0,
  }

  await api
    .post("/api/posts")
    .send(newPost)
    .expect(400)

  const postsAtEnd = await Post.find({})
  expect(postsAtEnd).toHaveLength(2)
})


afterAll(() => {
  mongoose.connection.close()
})
