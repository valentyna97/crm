<template>
  <div>
    <div class="page-title">
      <h3>Список вчителів</h3>
      <!-- Modal Trigger -->
      <div v-if="this.$store.getters.info.isAdmin"><button data-target="modal1" class="btn modal-trigger"><i class="material-icons">add</i></button></div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"> <i class=" close material-icons">close</i></a>
        <ListTCreate @created="addNewCategory"/>
      </div>
    </div>
    <section>
      <!-- Modal Structure -->
      <div id="modal2" class="modal">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"> <i class=" close material-icons">close</i></a>
      
      </div>
      
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <div v-if="this.$store.getters.info.isAdmin">
        <div v-for="list in listT" :key="list.title" v-on:click="name(list.id)" class="teacher-list">
          <router-link class="text-list" :to="{ path: `/createTeacher/${list.id}` }">
            {{list.fullName}}
          </router-link>
          <button class="btn" v-on:click="removeTeacher(list.id)"> <i class="material-icons right">delete</i></button>
        </div>
        </div>
         </div>
         <div class="row" v-if="!this.$store.getters.info.isAdmin">
         <div v-for="list in listT" :key="list.title" v-on:click="name(list.id)" class="teacher-list">
          <router-link class="text-list" :to="{ path: `/createTeacher/${list.id}` }">
            {{list.fullName}}
          </router-link>
        </div>
         </div>
<!--        <p v-else class="center">{{'Списку вчителів ще немає'}}</p>-->
    </section>
  </div>
</template>
<script>

 
    import ListTCreate from '@/components/ListTCreate'

    import M from 'materialize-css'
    import firebase from "firebase";
    export default {
        name: 'teacherList',
        data: () => ({
            current: null,
            listT: [],
            classT: [],
            title: '',
            loading: true
        }),
        async mounted () {
            this.listT = await this.$store.dispatch('fetchCategories')
            this.loading = false
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems,null);
        },
        components: {
            ListTCreate
        },
        methods: {
            addNewCategory (list) {
                this.listT.push(list)
            },
            name(id) {
                var list = firebase.database().ref(`/listT/` + id);
                id=list.key
            },
             async removeTeacher(id){
                 await this.$store.dispatch(
                    "removeTeacherFromList",
                    {
                        teacherID: id,
                    }
                );
                 this.$message('Ви видалили вчителя')
                this.listT = await this.$store.dispatch('fetchCategories')
            }
        }
    }
</script>
<style scoped>
.modal{
  height: 400px;
}
  .btn{
    background-color: #82b1ff;
  }
  
  .btn:hover, .btn-large:hover, .btn-small:hover{
    background-color: #82b1ff;
  }
  .text-list{
    margin-bottom: 20px;
  }
  .modal-close {
    position: absolute;
    right: 0;
  }
  .teacher-list{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  i{
    margin-left: 0;
  }
</style>