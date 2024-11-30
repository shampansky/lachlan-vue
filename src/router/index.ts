import { createRouter, createWebHistory } from 'vue-router'
import { useUsers } from '@/stores/users'
import HomeView from '@/views/HomeView.vue'
import NewPost from '@/views/NewPost.vue'
import ShowPost from '@/views/ShowPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/posts/:id',
      component: ShowPost,
    },
  ],
})

export default router
