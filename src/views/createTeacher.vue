<template>
  <div>
    <div class="page-title">
      <h3>{{ title }}</h3>
    </div>
    <Loader v-if="loading" />
    <form @submit.prevent="submitHandler" id="add-subject" v-else>
      <multiselect
        placeholder="Pick class"
        v-model="value"
        label="name"
        :close-on-select="true"
        :clear-on-select="false"
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
      <button class="btn waves-effect waves-light" type="submit" id="button">
        {{ "Додати" }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";
import { required, minValue } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import M from "materialize-css";

let classesData = [];
let subjectsData = [];
let selectedClassesByTeacher = [];

let multiselectDataClasses = [];
let selectDataSubjects = [];


export default {
  name: "createTeacher",
  components: { Multiselect },
  data: () => ({
    loading: true,
    title: "",
    options: classesData,
    objectOptions: subjectsData,
    value: [],
    subject: []
  }),
  async mounted() {
    console.log(this.$store);
    const userData = await this.$store.dispatch(
      "fetchUserById",
      this.$route.params.id
    );
    this.value = userData.classes;
    console.dir(userData);
    this.title = userData.title || "";
    this.listT = await this.$store.dispatch("fetchCategories");
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
    this.loading = false;

    // classesData = [];
    // subjectsData = [];
    // selectedClassesByTeacher = [];

    const selectedClasses = firebase
      .database()
      .ref(`/listT/${this.$route.params.id}/classes`);
    const classes = firebase.database().ref("classes");
    const subjects = firebase.database().ref("subject");

    classes.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        classesData.push(childSnapshot.val());
      });
    });
    subjects.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        subjectsData.push(childSnapshot.val());
      });
    });
    selectedClasses.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        selectedClassesByTeacher.push(childSnapshot.val());
      });
    });
  },
  create: {},
  methods: {
    async submitHandler() {
      const submitDataClasses = [];

      multiselectDataClasses.forEach(({ name }) =>
        submitDataClasses.push({ name })
      );

      await firebase
        .database()
        .ref(`/listT/${this.$route.params.id}/subject`)
        .push({
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