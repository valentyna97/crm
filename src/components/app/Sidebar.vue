<template>
  <ul class="sidenav app-sidenav " :class="{ open: value }">
    <router-link
            v-if="(this.$store.getters.info.isAdmin || this.$store.getters.info.isTeacher)"
            to="/teachers"
            tag="li"
            active-class="active"
    >
      <a href="#" class="waves-effect  pointer close-menu">Список вчителів</a>
    </router-link>
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" v-on:click="test()" class="waves-effect pointer close-menu">{{ link.title }}</a>
    </router-link>
  </ul>
</template>
<script>
export default {
  props: ["value"],
  data: () => ({
    links: [
      {
        title: "Розклад",
        url: "/",
        exact: true
      },
      // {
      //   title: "Список вчителів",
      //   url: "/teachers"
      // },
      {
        title: "Список учнів",
        url: "/pupils"
      },
      {
        title: "Журнал",
        url: "/lists"
      },
      {
        title: "Домашнє завдання",
        url: "/HomeTasks"
      }
    ],
  }),
    methods:{
        test() {
   
    }
    }
}
</script>
<style>
  .sidenav li>a:hover {
    background-color: #82b1ff!important;
  }
  .sidenav li.active{
    background-color: #82b1ff!important;
  }
  @media (max-width: 768px) {
    .app-sidenav.open{
      width: 100%;
      position: fixed;
    }
  }
</style>