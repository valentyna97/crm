<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else>
    <div class="page-title" v-if="!this.$store.getters.info.isAdmin">
      <h3>Оберіть клас</h3>
    </div>
    <div class="page-title" v-if="this.$store.getters.info.isAdmin">
      <h3>Оберіть клас, щоб додати учня</h3>
    </div>
    <div v-for = "(pupil, index) in listPupils" :key="index" v-on:click="SelectedClasses()">
      <router-link class="text-list" :to="{ path: `/pupils/${pupil.id}`}">
        {{pupil.name}}
      </router-link>
    </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import M from "materialize-css";
export default {
name: "createPupils",
  data: () => ({
      value: [] ,
      options: [],
      name: '',
      listPupils:[],
      loading: true,
      
  }),
    async mounted() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems,null);
        this.options = await this.$store.dispatch("fetchAllClasses");
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
        this.listPupils = await this.$store.dispatch("fetchAllClasses");
        this.loading = false
    },
    methods: {
        SelectedClasses() {
        
        },
        
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.modal.open{
  height: 220px;
  padding: 0;
}
</style>
