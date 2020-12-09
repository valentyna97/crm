<template>
  <Loader v-if="loading"/>
  <div v-else >
    <div class="page-title">
      <h3>Розклад для {{ classData.name || "[ undefined ]" }} класу</h3>
    </div>
            <span v-for="(item, index) in days" v-bind:key="index" class="list-item" style="display: block; padding: 5px; font-weight: bold; font-size: 18px">
              {{item.name}}
              <span  v-for="(s, index) in item.result" v-bind:key="index" class="list-item" style="display: block; font-weight: normal; font-size: 16px">
                 {{s}}
              </span>
            </span>
      <div class="row btn-schedule" v-if="this.$store.getters.info.isAdmin">
        <button class="btn  waves-effect waves-light btn-bg" type="submit" v-on:click="submitHandler()">Записати розклад</button>
        <!-- <button class="btn  waves-effect waves-light btn-bg"  type="submit" v-on:click="updateSchedule()">Редагувати розклад</button> -->
      </div>
  </div>
</template>

<script>
    let scheduleForBase = [];
    import M from "materialize-css";
    export default {
        name: "Home",
        data: () => ({
            resultArrays: [],
            days: [
                {
                    name: 'Понеділок',
                    result: [],
                },
                {
                    name: 'Вівторок',
                    result: [],
                },
                {
                    name: 'Середа',
                    result: [],
                },
                {
                    name: 'Четвер',
                    result: [],
                },
                {
                    name: "П'ятниця",
                    result: [],
                },
            ],
            pupilList: [],
            classData: [],
            classSubjectsList: [],
            currentSubjectIndex: 0,
            loading: true
        }),
        async mounted() {
            await this.updateClassData();
            this.classSubjectsList = this.classData["subject"] || [];

            this.loading = false;

            if (this.classData.schedule) {
              let scheduleID = Object.keys(this.classData.schedule).pop();

              this.setScheduleDataFromFirebase(this.classData.schedule[scheduleID]);
            } else {
              this.generateSchedule();
              await this.saveScheduleForClass();
              console.log("generate schedule");
            }
        },
        methods: {
            getSubjectForDay(subjects, currentDaySbjList) {
              let newSubject = this.getSubject(subjects);
              for (let i = 0; i < 5; i++) {
                const {subjectName, quantity } = newSubject;
                if (!subjectName) {
                  break;
                } else if (!currentDaySbjList.includes(subjectName) && quantity > 0) {
                  currentDaySbjList.push(subjectName);
                  newSubject.quantity--;
                  break;
                } else {
                  newSubject = this.getSubject(subjects);
                }
              }
            },
            getSubject(subjects) {
              let resultSubject = subjects[this.currentSubchannelIndex];
              this.currentSubchannelIndex++;

              if (this.currentSubchannelIndex >= subjects.length) {
                this.currentSubchannelIndex = 0;
              }

              return resultSubject;
            },
            isAllSubjectsQuantityEmpty(subjects) {
              let result = true;

              for (let subjectData of subjects) {
                if (subjectData.quantity > 0) {
                  result = false;
                  break;
                }
              }

              return result;
            },
            generateSchedule() {
              let subjects = this.classSubjectsList.map(item => { return {...item}; });

              this.currentSubchannelIndex = 0;

              let isAllQuantitiesEmpty = this.isAllSubjectsQuantityEmpty(subjects);

              while(!isAllQuantitiesEmpty) {
                for (const day of this.days) {
                  scheduleForBase = this.days;
                  this.getSubjectForDay(subjects, day.result);
                  subjects = subjects.filter(item => item.quantity > 0);

                  if (this.currentSubchannelIndex >= subjects.length) {
                    this.currentSubchannelIndex--;
                  }

                  isAllQuantitiesEmpty = this.isAllSubjectsQuantityEmpty(subjects);

                  if (isAllQuantitiesEmpty) {
                    break;
                  }
                }
              }
            },
            setScheduleDataFromFirebase(scheduleData) {
              this.days.forEach(day => {
                let scheduleForDay = scheduleData.find(item => item.name === day.name);

                day.result = [...scheduleForDay.result];
              })
            },
            async submitHandler()  {
              this.saveScheduleForClass();
            },
            async updateSchedule() {
              this.saveScheduleForClass();
            },
          async saveScheduleForClass() {
              let currentScheduleID = this.classData.schedule && Object.keys(this.classData.schedule).pop(),
                generatedScheduleData = this.days;

              console.log(`Schedule ID ${currentScheduleID}`);

              if (!currentScheduleID) {
                  console.log(`Push schedule`);
                  await this.$store.dispatch(
                      "pushSchedule",
                      {
                          classID: this.$route.params.id,
                          schedule: generatedScheduleData
                      }
                  );
              } else {
                  console.log(`Update schedule`);
                  await this.$store.dispatch(
                      "updateSchedule",
                      {
                          classID: this.$route.params.id,
                          scheduleData: generatedScheduleData,
                          scheduleID: currentScheduleID
                      }
                  );
              }
              await this.updateClassData();
          },
          async updateClassData() {
              this.classData = await this.$store.dispatch(
                 "getClassData",{
                      classID: this.$route.params.id,
                 }
              );
          }
        }
    };
</script>
<style>
  .btn{
    background-color: #82b1ff;
  }
  .btn:hover, .btn-large:hover, .btn-small:hover{
    background-color: #82b1ff;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
  }
  .btn-schedule{
    margin: 20px 0;
  }
  .btn-bg{
    background: #82b1ff;
    margin:0 5px;
  }
</style>
