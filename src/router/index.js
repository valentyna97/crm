import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app'
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
      path: "/pupils/:id",
      name: "createPupils",
      meta: { layout: 'main', auth: true },
      component: () => import("../views/addPupils.vue")
    },
    {
      path: "/",
      name: "schedule",
      meta: { layout: "main", auth: true },
      component: () => import("../views/scheduleClassesList.vue")
    },
    {
      path: "/schedule",
      name: "schedule",
      meta: { layout: "main", auth: true },
      component: () => import("../views/scheduleClassesList.vue")
    },
    {
      path: "/schedule/:id",
      name: "home",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Home.vue")
    },
    {
      path: "/teachers/",
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
      component: () => import("../views/ChooseClassForLists.vue")
    },
    {
      path: "/lists/:id",
      name: "lists",
      meta: { layout: "main", auth: true },
      component: () => import("../views/List.vue")
    },
    {
      path: "/HomeTasks",
      name: "HomeTasks",
      meta: { layout: "main", auth: true },
      component: () => import("../views/HomeTasks.vue")
    },
    {
      path: "/HomeTasks/:id",
      name: "HomeTasks",
      meta: { layout: "main", auth: true },
      component: () => import("../views/HomeTasksForClass.vue")
    },
  ]
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})
export default router;
