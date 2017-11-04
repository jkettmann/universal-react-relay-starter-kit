import AWS from 'aws-sdk'
import uuid from 'uuid/v4'

import { posts } from './testData/posts'
import { users } from './testData/users'
import { ROLES, ERRORS } from '../../config'

import User from '../data/model/User'
import Post from '../data/model/Post'

import { isLoggedIn, canPublish } from '../auth/utils'

export default class Database {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
      region: process.env.AWS_REGION,
    })
    this.client = new AWS.DynamoDB.DocumentClient()
    this.users = users.map(user => new User(user))
    this.posts = posts.map(post => new Post(post))
  }

  createPost = ({ creatorId, title, description, image }, user) => {
    return new Promise((resolve, reject) => {
      if (!canPublish(user)) {
        reject(new Error(ERRORS.Forbidden))
      }

      const post = new Post({
        id: uuid(),
        creatorId: user.id,
        title,
        image,
        description,
      })

      const params = {
        TableName: 'Post',
        Item: post,
      }

      this.client.put(params, (err, data) => {
        if (err) {
          reject(err)
        }
        console.log('created new post', post, data)
        resolve(post)
      })
    })
  }

  getPost = id => this.posts.find(post => post.id === id)

  getPosts = () => this.posts

  getPostsForCreator = ({ id, role } = {}) => {
    if (!isLoggedIn({ role })) {
      return []
    }

    return this.posts.filter(post => post.creatorId === id)
  }

  getPostCreator = (post) => {
    // this is accessible by anyone so only return public data (no email etc.)
    const { firstName, lastName } = this.getUserById(post.creatorId)
    return { firstName, lastName }
  }

  getUserById = id => id && this.users.find(user => user.id === id)

  getUserWithCredentials = (email, password) => {
    const user = this.users.find(
      userData => userData.email === email && userData.password === password,
    )

    if (!user) {
      throw new Error(ERRORS.WrongEmailOrPassword)
    }

    return user
  }

  createUser = ({ id, email, firstName, lastName }) => {
    return new Promise((resolve, reject) => {
      const user = new User({
        id,
        email,
        firstName,
        lastName,
      })

      const params = {
        TableName: 'User',
        Item: user,
      }

      this.client.put(params, (err, data) => {
        if (err) {
          reject(err)
        }
        console.log('created new user', user, data)
        resolve(user)
      })
    })
  }
}
