<template>
  <div>
    <Loader v-if="loading"/>
    <div class="page-title"  v-else>
      <h4>Журнал оцінок для {{ classData.name || "[ undefined ]" }} класу</h4>
    </div>
    <table  v-if="this.$store.getters.info.isTeacher">
      <thead>
      <tr>
        <th>Список предметів/<br>Список учнів</th>
        <td>
            <multiselect
                    placeholder="Select subject"
                    label="name"
                    v-model="sub"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :multiple="false"
                    track-by="name"
                    :options="options"
                    :searchable="false"
            ></multiselect>
        </td>
      </tr>
      </thead>
      <tr v-for="studentItem in studentsList" :key="studentItem.pupilData.student" class="input-val"> <p class="test">{{studentItem.pupilData.student}}</p>
        <td >
          <input type="number" name="estimate" max="12" v-model="studentItem.currentMark" placeholder="Поставте оцінку"> </td>
      </tr>
    </table>
    <button style="margin: 20px 0" v-if="this.$store.getters.info.isTeacher" class="btn" v-on:click="saveMarksForStudents()">Додати оцінку<i class="material-icons" >add</i></button>
   
     <div v-if="this.$store.getters.info.isTeacher" class="page-title" style="margin-top: 10px">
     <h4>Журнал оцінок</h4>
     </div>
   <div v-for="(item, index) in studentsList" :key="index" style="font-size: 16px">
        <p style="font-weight: bold">{{item.pupilData.student}}</p>
      <p v-for="(mark,index) in Object.entries(item.markList)" :key='index'>{{`${mark[0]}: ${mark[1].join(',')}`}}<br></p>
    </div>

  </div>
</template>
<script>
    import M from "materialize-css";
    import Multiselect from "vue-multiselect";

    export default {
        name: "lists",

        data: () => ({
            loading: true,
            classData: null,
            subName: [],
            classesList:[],
            sub: null,
            studentsList:[],
            listT: [],
            options: []
        }),
          components: {
            Multiselect
        },
        async mounted() {
            const studentsList = this.studentsList = await this.$store.dispatch(
                "getStudents",{
                    id: this.$route.params.id,
                     student: this.student
                }
            );

            this.studentsList = studentsList.map(item => {
              return {
                ...item,
                currentMark: null
              };
            });

            this.select = M.FormSelect.init(this.$refs.select);
            this.listT = await this.$store.dispatch('fetchCategories');
            this.classData = await this.$store.dispatch(
                "getClassData",{
                    classID: this.$route.params.id,
                }
            );
            this.classesList = await this.$store.dispatch(
                "getClassSubject",{
                    classID: this.$route.params.id,
                }
            );

            this.options = this.classData ? this.classData.subject.map(item => {
              return {
                name: item.subjectName
              }
            }) : null;

            if (this.options.length) {
              this.sub = this.options[0];
            }


            this.loading = false
        },
        methods: {
            async saveMarksForStudents() {
              let requiredStudent;

              for (let student of this.studentsList) {
                requiredStudent = this.classData.students[student.id];

                if (!student.currentMark) {
                  continue;
                }

                if (requiredStudent.markList) {
                  Array.isArray(requiredStudent.markList[this.sub.name]) ?
                          requiredStudent.markList[this.sub.name].push(student.currentMark) :
                          requiredStudent.markList[this.sub.name] = [student.currentMark];
                } else {
                  requiredStudent.markList = {
                    [this.sub.name]: [student.currentMark]
                  }
                }

                requiredStudent &&
                await this.$store.dispatch(
                    "updateMarForStudent",{
                        classID: this.$route.params.id,
                        studentID: student.id,
                        markList: requiredStudent.markList
                    }
                );
                 this.$message('Ви додали оцінку')
                // this.studentItem = ''
              }
              const studentsList = this.studentsList = await this.$store.dispatch(
                "getStudents",{
                    id: this.$route.params.id,
                     student: this.student
                }
            );
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .btn{
    background-color: #82b1ff;
    display: flex;
  }

  .btn:hover, .btn-large:hover, .btn-small:hover{
    background-color: #82b1ff;
  }
</style>