<!--<template>-->
<!--  <div class="col s12 m6">-->
<!--    <div>-->
<!--      <div class="page-subtitle">-->
<!--        <h4>{{'Редагувати список вчителів'}}</h4>-->
<!--      </div>-->
<!--      <form @submit.prevent = "submitHandler">-->
<!--        -->
<!--        <multiselect-->
<!--                placeholder="Select subject"-->
<!--                v-model="subject"-->
<!--                label="name"-->
<!--                :close-on-select="true"-->
<!--                :multiple="false"-->
<!--                track-by="name"-->
<!--                :options="objectOptions"-->
<!--                :searchable="false"-->
<!--                @input="dispatchAction($event)">-->
<!--          ></multiselect>-->
<!--        <multiselect-->
<!--                placeholder="Select class"-->
<!--                v-model="value"-->
<!--                label="name"-->
<!--                :close-on-select="true"-->
<!--                :clear-on-select="true"-->
<!--                :multiple="true"-->
<!--                track-by="name"-->
<!--                :options="options"-->
<!--                :searchable="false"-->
<!--        -->
<!--        ></multiselect>-->
<!--        <button class="btn waves-effect waves-light" type="submit">-->
<!--          Оновити-->
<!--          <i class="material-icons right">send</i>-->
<!--        </button>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--    import M from 'materialize-css'-->
<!--    import { required, minValue } from 'vuelidate/lib/validators'-->
<!--    import Multiselect from "vue-multiselect";-->
<!--    import firebase from "firebase";-->
<!--    let subjectsData = [];-->
<!--    let subAsds;-->
<!--    let subjects;-->
<!--    let selectedClassesByTeacher;-->
<!--    export default {-->
<!--        components: { Multiselect },-->
<!--        data: () => ({-->
<!--            title: '',-->
<!--            value: null,-->
<!--            options: [],-->
<!--            subject: [],-->
<!--            objectOptions: subjectsData,-->
<!--        }),-->
<!--        validations: {-->
<!--            title: { required },-->
<!--            limit: { minValue: minValue(1) }-->
<!--        },-->
<!--        watch: {-->

<!--        },-->
<!--        async mounted() {-->
<!--            subjects =  firebase.database().ref(`/listT/${this.$route.params.id}/subject`);-->
<!--            this.listT = await this.$store.dispatch("fetchCategories");-->
<!--            subjects.once('value').then(function(snapshot)  {-->
<!--                subjectsData = [];-->
<!--                snapshot.forEach(function(childSnapshot) {-->
<!--                    subjectsData.push(childSnapshot.val());-->
<!--                });-->
<!--                // console.log(subjectsData)-->
<!--            });-->
<!--            const subById =  await this.$store.dispatch(-->
<!--                "fetchSubById",-->
<!--                this.$route.params.id,-->
<!--                this.subject,-->
<!--            );-->
<!--            subAsds = [];-->
<!--            for(let key in subById){-->
<!--                subAsds.push(subById[key]);-->
<!--            }-->
<!--            let arrayIt =[];-->
<!--            for(let it in subAsds) {-->
<!--                // console.log(subAsds[it])-->
<!--                for(let obj in subAsds[it]){-->
<!--                    console.log(subAsds[it][obj])-->
<!--                }-->
<!--              -->
<!--            }-->
<!--          -->
<!--            this.select = M.FormSelect.init(this.$refs.select)-->
<!--            M.updateTextFields()-->
<!--        },-->
<!--        methods: {-->
<!--            submitHandler() {-->
<!--            },-->
<!--            dispatchAction(action) {-->
<!--                const classesFromBase = firebase.database().ref(`/listT/${this.$route.params.id}/subject/`);-->
<!--                let classesBase;-->
<!--                classesFromBase.once('value').then(function (snapshot) {-->
<!--                    classesBase = [];-->
<!--                    snapshot.forEach(function (childSnapshot) {-->
<!--                        classesBase.push(childSnapshot.val());-->
<!--                    });-->
<!--                    // console.log(classesBase);-->
<!--                    // console.log(action.name)-->
<!--                });-->
<!--     -->
<!--            }-->
<!--        },-->
<!--        destroyed () {-->
<!--            if (this.select && this.select.destroy) {-->
<!--                this.select.destroy()-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<style computed>-->
<!--  .btn-dlt{-->
<!--    margin-top: 15px;-->
<!--  }-->
<!--</style>-->
<!--<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>-->