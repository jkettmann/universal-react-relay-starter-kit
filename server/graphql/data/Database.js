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

  createPost = ({ creatorId, title, description, image }, user) => new Promise((resolve, reject) => {
    if (!canPublish(user)) {
      reject(new Error(ERRORS.Forbidden))
      return
    }

    const isoDate = new Date().toISOString()
    const post = new Post({
      id: uuid(),
      creatorId: user.id,
      createdAt: isoDate,
      updatedAt: isoDate,
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
        return
      }
      console.log('created new post', post, data)
      resolve(post)
    })
  })

  getPost = id => new Promise((resolve, reject) => {
    const params = {
      Key: { id },
      TableName: 'Post',
    }

    this.client.get(params, (error, data) => {
      if (error) {
        reject(error)
        return
      }

      resolve(new Post(data.Item))
    })
  })

  getPosts = () => new Promise((resolve, reject) => {
    const params = {
      TableName: 'Post',
    }

    this.client.scan(params, (error, data) => {
      if (error) {
        reject(error)
        return
      }
      resolve(data.Items.map(item => new Post(item)))
    })
  })

  getPostsForCreator = ({ id, role } = {}) => new Promise((resolve, reject) => {
    if (!isLoggedIn({ role })) {
      resolve([])
      return
    }

    const params = {
      TableName: 'Post',
      FilterExpression: '#creatorId = :creatorId',
      ExpressionAttributeNames: {
        '#creatorId': 'creatorId',
      },
      ExpressionAttributeValues: {
        ':creatorId': id,
      },
    }

    this.client.scan(params, (error, data) => {
      if (error) {
        reject(error)
        return
      }
      resolve(data.Items.map(item => new Post(item)))
    })
  })

  // this is accessible by anyone so only return public data (no email etc.)
  getPostCreator = post => this.getUserById(post.creatorId)
    .then(({ firstName, lastName }) => ({ firstName, lastName }))

  getUserById = id => new Promise((resolve, reject) => {
    const params = {
      Key: { id },
      TableName: 'User',
    }

    this.client.get(params, (error, data) => {
      if (error) {
        reject(error)
        return
      }

      resolve(new User(data.Item))
    })
  })

  createUser = userData => new Promise((resolve, reject) => {
    const user = new User(userData)

    const params = {
      TableName: 'User',
      Item: user,
    }

    this.client.put(params, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      console.log('created new user', user, data)
      resolve(user)
    })
  })
}
