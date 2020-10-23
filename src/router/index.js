import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app'
import Admin from '@/views/Admin'
import Driver from '@/views/Driver'
import Customer from '@/views/Customer'
Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { layout: "empty" },
      component: () => import("../views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "empty" },
      component: () => import("../views/Register.vue")
    },
    {
      path: "/createTeacher/:id",
      name: "createTeacher",
      meta: { layout: 'main', auth: true },
      component: () => import("../views/createTeacher.vue")
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile.vue')
    },
    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Home.vue")
    },
    {
      path: "/teachers",
      name: "teachers",
      meta: { layout: "main", auth: true },
      component: () => import("../views/TeachersList.vue")
    },
    {
      path: "/pupils",
      name: "pupils",
      meta: { layout: "main", auth: true },
      component: () => import("../views/PupilsList.vue")
    },
    {
      path: "/lists",
      name: "lists",
      meta: { layout: "main", auth: true },
      component: () => import("../views/List.vue")
    },
    {
      path: "/notifications",
      name: "notifications",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Notifications.vue")
    },
  ]
});
// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser
//   const requireAuth = to.matched.some(record => record.meta.auth)
//   if (requireAuth && !currentUser) {
//     next('/login?message=login')
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {

  firebase.auth().onAuthStateChanged(userAuth => {

    if (userAuth) {
      firebase.auth().currentUser.getIdTokenResult()
          .then(function ({
                            claims
                          }) {

            if (claims.customer) {
              if (to.path !== '/customer')
                return next({
                  path: '/customer',
                })
            } else if (claims.admin) {
              if (to.path !== '/admin')
                return next({
                  path: '/admin',
                })
            } else if (claims.driver) {
              if (to.path !== '/driver')
                return next({
                  path: '/driver',
                })
            }

          })
    } else {
      if (to.matched.some(record => record.meta.auth)) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    }

  })

  next()

})
export default router;
