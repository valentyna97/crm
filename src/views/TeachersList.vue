<template>
  <div>
    <div class="page-title">
      <h3>Список вчителів</h3>
      <!-- Modal Trigger -->
      <button data-target="modal1" class="btn modal-trigger"><i class="material-icons">add</i></button>
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
        <ListTEdit
                v-if="listT.length"
                :listT = "listT"
                :key="listT.length + updateCount"
                @updated="updateListT"
                @delete="removeElement"
        />
      </div>
      
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <div v-for="list in listT" :key="list.title" v-on:click="name(list.id)">
          <router-link class="text-list" :to="{ path: `/createTeacher/${list.id}` }">
            {{list.title}}
          </router-link>
          <button data-target="modal2" class="btn modal-trigger" v-on:click="say(list.id)"><i class="material-icons">Оновити</i></button>
        </div>
<!--        <p v-else class="center">{{'Списку вчителів ще немає'}}</p>-->
      </div>
    </section>
  </div>
</template>
<script>
    import ListTCreate from '@/components/ListTCreate'
    import ListTEdit from '@/components/ListTEdit'
    import M from 'materialize-css'
    import firebase from "firebase";
    export default {
        name: 'teacherList',
        data: () => ({
            current: null,
            listT: [],
            classT: [],
            loading: true,
            updateCount: 0
        }),
        async mounted () {
            this.listT = await this.$store.dispatch('fetchCategories')
            this.loading = false
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems,null);
        },
        components: {
            ListTCreate,
            ListTEdit
        },
        methods: {
            addNewCategory (list) {
                this.listT.push(list)
            },
            updateListT (list) {
                const idx = this.listT.findIndex(c => c.id === list.id)
                this.listT[idx].title = list.title
                this.listT[idx].limit = list.limit
                this.listT[idx].value = list.value
                this.updateCount++
            },
            removeElement(list) {
                this.listT.reset(list)
            },
            name(id) {
                var list = firebase.database().ref(`/listT/` + id);
                id=list.key
            }
        }
    }
</script>
<style scoped>
  .text-list{
    margin-bottom: 20px;
  }
  .modal-close {
    position: absolute;
    right: 0;
  }
</style>