import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";

const api = supertest(app);

import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";


