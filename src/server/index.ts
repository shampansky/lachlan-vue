import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { today, thisWeek, thisMonth } from '../posts'
import type { Post } from '../posts'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]

app.get('/posts', (_, res) => {
  res.json(allPosts)
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(allPosts)
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
