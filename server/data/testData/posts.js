import Post from '../../data/model/Post'

// eslint-disable-next-line import/prefer-default-export
export const posts = [
  new Post({
    id: '1',
    creatorId: '3',
    title: 'An interesting story',
    image: {
      fileKey: 'image1.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '2',
    creatorId: '2',
    title: 'More interesting',
    image: {
      fileKey: 'image2.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '3',
    creatorId: '2',
    title: 'Very nice post',
    image: {
      fileKey: 'image3.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '4',
    creatorId: '3',
    title: 'Even nicer post',
    image: {
      fileKey: 'image4.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '5',
    creatorId: '3',
    title: 'Look at that image',
    image: {
      fileKey: 'image5.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '6',
    creatorId: '2',
    title: 'Have a nice day',
    image: {
      fileKey: 'image6.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '7',
    creatorId: '3',
    title: 'Must do',
    image: {
      fileKey: 'image7.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '8',
    creatorId: '2',
    title: 'Modern society',
    image: {
      fileKey: 'image8.jpg',
    },
    description: 'description',
  }),
  new Post({
    id: '9',
    creatorId: '2',
    title: 'Modern society 2',
    image: {
      fileKey: 'image9.jpg',
    },
    description: 'description',
  }),
]
