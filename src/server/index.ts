import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import type { Request, Response } from 'express'
import { today, thisWeek, thisMonth } from '../posts'
import type { Post } from '../posts'
import type { NewUser, User } from '../users'

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get('/posts', (_, res) => {
  res.json(allPosts)
})

app.put<{}, {}, Post>('/posts', (req, res) => {
  const index = allPosts.findIndex((post) => post.id === req.body.id)
  if (index === -1) {
    throw Error(`Post with id ${req.body.id} was not found`)
  }
  const existingPost = allPosts[index]
  allPosts[index] = { ...existingPost, ...req.body }
  res.json(allPosts[index])
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(allPosts)
})

const SECRET = 'my-secret'
const COOKIE = 'vuejs-jwt'
function authenticate(id: string, req: Request, res: Response) {
  console.log('request:', req, 'response:', res)
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'eugen',
    expiresIn: '30 days',
  })
  console.log('token:', token)
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET) as { id: string }
    res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.post<{}, {}, NewUser>('/logout', (_, res) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
})

app.post<{}, {}, NewUser>('/login', (req, res) => {
  const targetUser = allUsers.find((user) => user.username === req.body.username)
  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenticate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.post<{}, {}, NewUser>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  authenticate(user.id, req, res)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
