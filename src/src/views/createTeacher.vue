<template>
  <div>
    <div class="page-title">
      <h3>{{ title }}</h3>
    </div>
  
    <div v-for="(item, index) in subAsd" :key="index">
      {{ item.name }}
        <div v-for="(n, index) in item.classes" :key="index">
           {{ n.name }}
        </div>
    </div>
<!--    <Loader v-if="loading" />-->
    <button  data-target="add-teacher" class="btn modal-trigger"><i class="material-icons" >add</i></button>
  
    <ListTEdit></ListTEdit>
    
    
    
    <div id="add-teacher" class="modal">
    <form @submit.prevent="submitHandler" >
        <div class='modal-content'>
      <multiselect
        placeholder="Select class"
        v-model="value"
        label="name"
        :close-on-select="true"
        :clear-on-select="true"
        :multiple="true"
        track-by="name"
        :options="options"
        :searchable="false"
        @input="dispatchAction($event)"
      ></multiselect>
      <multiselect
        placeholder="Select subject"
        v-model="subject"
        label="name"
        :close-on-select="true"
        :multiple="false"
        track-by="name"
        :options="objectOptions"
        :searchable="false"
        @input="handleSelectSubject($event)"
      ></multiselect>
        </div>
      <button class="btn  waves-effect waves-light" type="submit" id="button">Додати
        <i class="material-icons right">send</i>
      </button>
    </form>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";
import M from "materialize-css";
import ListTEdit from "../components/ListTEdit";

let classesData = [];
let subjectsData = [];
let selectedClassesByTeacher = [];

let multiselectDataClasses = [];
let selectDataSubjects = [];
let listSub = [];
let objSubId = [];
let subAsds;

export default {
  name: "createTeacher",

  data: () => ({
    loading: true,
    title: "",
    subById: "",
    options: classesData,
    objectOptions: subjectsData,
    value: [],
    subject: [],
    listT: [],
    listSubjects: listSub,
    updateCount: 0,
    objSubId: [],
    subAsd: subAsds
  }),
    components: {
        ListTEdit,
        Multiselect
    },
  async mounted() {
      var elem = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elem,null);
    const userData = await this.$store.dispatch(
      "fetchUserById",
      this.$route.params.id
    );
      const subById = await this.$store.dispatch(
          "fetchSubById",
          this.$route.params.id,
          this.subject,
      );
      subAsds = [];
      for(let key in subById){
          subAsds.push(subById[key]);
      }
      
    this.title = userData.title || "";
      objSubId = JSON.parse(JSON.stringify(subById));
    this.listT = await this.$store.dispatch("fetchCategories");

    this.loading = false;
    const selectedClasses = firebase.database().ref(`/listT/${this.$route.params.id}/classes`);
    const classes = firebase.database().ref("classes");
    const subjects = firebase.database().ref("subject");
    const Sub = firebase.database().ref(`/listT/${this.$route.params.id}/subject/`);
      
      Sub.once('value').then(function(snapshot)  {
          snapshot.forEach(function (childSnapshot) {
              // listSub.push(childSnapshot.val());
           listSub =  snapshot.val()|| 'Anonymous';
          });
      });
     classes.once('value').then(function(snapshot)  {
      classesData = [];
      snapshot.forEach(function(childSnapshot) {
        classesData.push(childSnapshot.val());
      });
    });
    subjects.once('value').then(function(snapshot)  {
      subjectsData = [];
      snapshot.forEach(function(childSnapshot) {
        subjectsData.push(childSnapshot.val());
      });
    });
    selectedClasses.once('value').then(function(snapshot)  {
        selectedClassesByTeacher = [];
   snapshot.forEach(function(childSnapshot) {
        selectedClassesByTeacher.push(childSnapshot.val());
      });
      
    });
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
  },
  methods : {
    async submitHandler() {
      const submitDataClasses = [];

      multiselectDataClasses.forEach(({ name }) =>
        submitDataClasses.push({ name })
      );
       firebase.database().ref(`/listT/${this.$route.params.id}/subject`).push({
          name: selectDataSubjects,
          classes: submitDataClasses
        });
   
      this.value = [];
      this.subject = [];
    },
    dispatchAction(actionName) {
      multiselectDataClasses = actionName;
    },
    handleSelectSubject(actionName) {
      selectDataSubjects = actionName.name;
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.page-title {
  padding-bottom: 0.3rem;
}

input[type="text"]:not(.browser-default):disabled {
  border-bottom: none;
  font-size: 28px;
  color: black;
  margin-bottom: 0;
}

#mySelect {
  display: block !important;
}

.classItem select {
  display: block !important;
}
</style>