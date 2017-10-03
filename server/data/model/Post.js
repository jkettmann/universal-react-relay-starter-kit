import Image from './Image'

export default class Post {
  constructor(fields) {
    this.id = fields.id
    this.creatorId = fields.creatorId
    this.title = fields.title
    this.image = new Image(fields.image)
    this.description = fields.description
  }
}
