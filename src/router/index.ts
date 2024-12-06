import { createRouter, createWebHistory } from 'vue-router'
import { useUsers } from '@/stores/users'
import HomeView from '@/views/HomeView.vue'
import NewPost from '@/views/NewPost.vue'
import ShowPost from '@/views/ShowPost.vue'
import EditPost from '@/views/EditPost.vue'

export const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/posts/new',
    component: NewPost,
    beforeEnter: () => {
      const usersStore = useUsers()

      if (!usersStore.currentUserId) {
        return {
          path: '/',
        }
      }
    },
  },
  {
    path: '/posts/:id/edit',
    component: EditPost,
  },
  {
    path: '/posts/:id',
    component: ShowPost,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
