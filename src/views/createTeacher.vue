<template>
  <div>
    <Loader v-if="loading"/>
    <div class="page-title" v-else>
      <h3>{{ fullName }}</h3>
        <button data-target="updateName" class=" modal-trigger btn"><i  class="material-icons name-teacher" >border_color</i></button>
    </div>
  
    <div id="updateName" class="modal">
    <div class="page-title" style="margin-bottom: 10px">
      <h5>Редагувати ім'я вчителя</h5>
       <button class=" modal-close" style="background:transparent"> X</button>
    </div>
    <input v-model = "fullName">
        <button class="btn modal-close" v-on:click="updateTeacher()">
          Оновити<i class="material-icons">update</i>
        </button>
    </div>
          <div
              class="subject-container"
              v-for="(subjectItem, subjectID) in subjects"
              :key="subjectID"
      >
        <div class="w-100">
            {{ subjectItem.name }}
  
            <button class="removesubject" v-on:click="removeSubject(subjectID)">X</button>
            
        </div>
            <multiselect
                    placeholder="Select class"
                    label="name"
                    v-model="subjectItem.classes"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :multiple="true"
                    track-by="name"
                    :options="options"
                    :searchable="false"
                    @input="updateClasses($event)"
            ></multiselect>
          
      </div>
      <div style="display:flex; align-items:center">
      <button v-if="this.$store.getters.info.isAdmin" class="btn" v-on:click="updateInfo()">
        Оновити дані<i class="material-icons">update</i>
      </button>
    <button v-if="this.$store.getters.info.isAdmin" data-target="add-teacher" class="btn modal-trigger">
      Додати клас та предмет<i class="material-icons">add</i>
    </button>
      </div>
    
    <div id="add-teacher" class="modal modal-add-subject">
      <form @submit.prevent="submitHandler" >
        <div class="page-title w-100">
            <h3>Обрати предмет та клас для вчителя</h3>
          <button class="modal-close" style="background: none;">X</button>
        </div>
    
        <div class='modal-content'>
          <multiselect
                  placeholder="Select subject"
                  v-model="subjectToAdd"
                  label="name"
                  :close-on-select="true"
                  :multiple="false"
                  track-by="name"
                  :options="objectOptions.filter(item => !this.currentTeacherSubjects.includes(item.name) )"
                  :searchable="false"
                  @input="handleSelectSubject($event)"
          ></multiselect>
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
        </div>
        <button class="btn  waves-effect waves-light " type="submit" id="button">Додати
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

    let multiselectDataClasses = [];
    let selectDataSubjects = [];
    let subAsds;
    const submitDataClasses = [];

    export default {
        name: "createTeacher",

        data: () => ({
            loading: true,
            fullName: "",
            subById: "",
            options: [],
            objectOptions: [],
            value: [],
            subjects: {},
            currentTeacherSubjects: [],
            subjectToAdd: [],
            listT: [],
            currentTeacherData: null,
            subAsd: subAsds,
            addSubjectModal: null
        }),
        components: {
            Multiselect
        },
        async mounted() {
            let elem = document.querySelectorAll('.modal');
            this.addSubjectModal = M.Modal.init(elem,null);
            this.options = await this.$store.dispatch("fetchAllClasses");
            this.objectOptions = await this.$store.dispatch("fetchAllSubjects");
            this.reloadUserData();
            this.listT = await this.$store.dispatch("fetchCategories");
            this.loading = false;
            this.select = M.FormSelect.init(this.$refs.select);
            M.updateTextFields();
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems,null);
            this.loading = false
        },
        methods : {
            async submitHandler() {
                let context = this;

                multiselectDataClasses.forEach( ({ name }) => submitDataClasses.push({ name }) );
                await this.$store.dispatch(
                        "addNewSubject",
                        {
                          teacherID: this.$route.params.id,
                          data: {
                              name: selectDataSubjects,
                              classes: submitDataClasses
                          }
                        }
                );

                this.reloadUserData();
                this.value = [];
                this.subjectToAdd = [];
            },
            dispatchAction(actionName) {
                multiselectDataClasses = actionName;
            },
            updateClasses(actionName) {
                multiselectDataClasses = actionName;
                console.log(multiselectDataClasses)
            },
            handleSelectSubject(actionName) {
                selectDataSubjects = actionName.name;
            },
            async updateTeacher(){
                await this.$store.dispatch(
                    "updateTeacher",
                    {
                        teacherID: this.$route.params.id,
                        fullName: this.fullName,
                    }
                );
            },
            async updateInfo() {
                await this.$store.dispatch(
                        "updateInfo",
                        {
                          teacherID: this.$route.params.id,
                          subjectData: { ...this.subjects }
                        }
                );
            },
            async reloadUserData() {
              const userData = await this.$store.dispatch(
                  "fetchUserById",
                  this.$route.params.id
              );
              this.fullName = userData.fullName || "";
              this.currentTeacherData = { ...userData };
              this.subjects = userData && userData.subject ? { ...userData.subject } : {};
              this.currentTeacherSubjects = Object.values(this.subjects).map(item => item.name);
            },
            async removeSubject(subjectKey) {
              console.log(subjectKey);

              await this.$store.dispatch(
                    "removeSubject",
                    {
                      teacherID: this.$route.params.id,
                      subjectID: subjectKey
                    }
                );
              this.reloadUserData()
            }
        }
    };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .btn{
    background-color: #82b1ff;
    margin: 10px 5px;
    display: flex;
  }

  .btn:hover, .btn-large:hover, .btn-small:hover{
    background-color: #82b1ff;
  }
  .multiselect__tag{
    background: #82b1ff;
  }
  .multiselect__option--selected.multiselect__option--highlight{
    background: #82b1ff;
  }
  .multiselect__option--highlight{
    background: #82b1ff;
  }
  .multiselect__option--highlight:after{
    background: #82b1ff;
  }
  .multiselect__option--selected.multiselect__option--highlight:after{
    background: #82b1ff;
   }
  .removesubject{
      background: none;
      border: none;
  }
  .subject-container {
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #777;
    border-radius: 10px;
  }
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
  .name-teacher{
    cursor: pointer;
  }
  .modal.open{
    height: 215px;
    padding: 20px;
  }
  .modal .modal-content{
    padding: 0;
    padding-bottom: 15px;
  }
  .modal.open.modal-add-subject{
    height: 300px;
  }
  .w-100{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
  }
  .subject-container .w-100{
    justify-content: space-between;
  }
  .modal-close{
    border: none;
  }
  .multiselect{
    margin: 10px 0;
  }
</style>