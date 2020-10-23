<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-purple pointer">{{ link.title }}</a>
    </router-link>
  </ul>
  <!--    <ul class="sidenav app-sidenav open">-->
  <!--        <li>-->
  <!--            <a href="#" class="waves-effect waves-purple pointer">Розклад</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--            <a href="#" class="waves-effect waves-purple pointer">Список вчителів</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--            <a href="#" class="waves-effect waves-purple pointer">Список учнів</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--            <a href="#" class="waves-effect waves-purple pointer">Журнал</a>-->
  <!--        </li>-->
  <!--        <li>-->
  <!--            <a href="#" class="waves-effect waves-purple pointer">Сповіщення</a>-->
  <!--        </li>-->
  <!--    </ul>-->
</template>
<script>
// import localizeFilter from '@/filters/localize.filter'
export default {
  props: ["value"],
  data: () => ({
    links: [
      {
        title: "Розклад",
        url: "/",
        exact: true
      },
      {
        title: "Список вчителів",
        url: "/teachers"
      },
      {
        title: "Список учнів",
        url: "/pupils"
      },
      {
        title: "Журнал",
        url: "/lists"
      },
      {
        title: "Сповіщення",
        url: "/notifications"
      }
    ]
  })
};
</script>
