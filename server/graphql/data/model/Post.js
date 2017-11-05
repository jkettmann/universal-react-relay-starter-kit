export default class Post {
  constructor(fields) {
    this.id = fields.id
    this.creatorId = fields.creatorId
    this.createdAt = fields.createdAt
    this.updatedAt = fields.updatedAt
    this.title = fields.title
    this.image = fields.image
    this.description = fields.description
  }
}
