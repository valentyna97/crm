<template>
  <div>
    <div class="page-title">
      <h3>Розклад</h3>
      
      <button class="btn waves-effect waves-purple btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    
    <Loader v-if="loading"/>
    <div v-else class="row">
      <button v-on:click="Schedule()">Сформувати розклад</button>
      <p></p>
    </div>
            <span v-for="(item, index) in days" v-bind:key="index" class="list-item" style="display: block;background: red; padding: 5px">
              {{item.name}}
              <span  v-for="(s, index) in item.result" v-bind:key="index" class="list-item" style="display: block; background: #ccc;">
                 {{s}}
              </span>
            </span>
    
  </div>
</template>

<script>
    // import MainLayout from "../layouts/MainLayout";
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
            loading: true
        }),
        // components: {MainLayout}
        async mounted() {
            this.loading = false

        },
        methods: {
            Schedule() {
                const subjects = [['Історія', 2], ['Зарубіжна', 1], ['Українська мова', 2], ['Українська література', 2], ['Англійська мова', 2]];
                const generateShedule = (subjects, daysCounts, subjectCounts) => {
                    const resultArray = [];
                    const day = [];
                    for (let i = 0; i < daysCounts; i++) {
                        const dayShedule = [];
                        for (let j = 0; j < subjectCounts; j++) {
                            if (!subjects.length) {
                                break;
                            }
                            if (subjects.length === 1 && dayShedule.length) {
                                const isIcludesSubject = dayShedule.includes(subjects[0][0]);
                                if (isIcludesSubject) {
                                    break;
                                }
                            }
                            const indexSubject = Math.floor(Math.random() * subjects.length);
                            const subject = subjects[indexSubject][0];
                            const hours = subjects[indexSubject][1];
                            const isIsncludes = dayShedule.includes(subject);
                            if (isIsncludes) {
                                j--;
                                continue;
                            } else {
                                dayShedule.push(subject);
                                hours - 1 === 0 ? subjects.splice(indexSubject, 1) : (subjects[indexSubject][1] -= 1);
                            }
                        }
                        if (dayShedule.length > 0) {
                            day.push(dayShedule);
                        }
                    }
                    
                    console.log(day.length);
                    
                    for (let i = 0; i < day.length; i++) {
                        for(let j =0; j<day[i].length; j++){
                            let a = day[i][j];
                          
                            console.log(a)
                            this.days[i].result.push(a);
                        }
                        
                       
                    }
                };

                generateShedule(subjects, 5, 2)

                // console.log(generateShedule(subjects, 5, 2));
            }
        }
    };
</script>
