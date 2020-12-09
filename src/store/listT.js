import firebase from 'firebase/app'
import config from '../utils/constants';
import {user} from "firebase-functions/lib/providers/auth";


export default {
  actions: {
    async fetchCategories ({ commit, dispatch }, id) {
      try {
        const listT = (await firebase.database().ref(`/listT`).once('value')).val() || {}
        return Object.keys(listT).map(key => ({ ...listT[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchAllClasses({ commit, dispatch }) {
      try {
        const listClasses = (await firebase.database().ref("classes").once('value')).val() || {}
        return Object.keys(listClasses).map(key => ({ ...listClasses[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getClassData({ commit, dispatch }, { classID }) {
      try {
        return (await firebase.database().ref(`classes/${classID}`).once('value')).val() || {};
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getClassSubject({ commit, dispatch }, { classID }) {
      try {
        const ClassSubject = (await firebase.database().ref(`classes/${classID}/subject`).once('value')).val() || {};
        return Object.keys(ClassSubject).map(key => ({ ...ClassSubject[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getHomework({ commit, dispatch }, { classID }) {
      try {
        const homework = (await firebase.database().ref(`classes/${classID}/homework`).once('value')).val() || {};
        return Object.keys(homework).map(key => ({ ...homework[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getStudents({ commit, dispatch },  { id, student: student }) {
      try {
        const listStudents = (await firebase.database().ref(`classes/${id}/students`).once('value')).val() || {}
        return Object.keys(listStudents).map(key => ({ ...listStudents[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateMarForStudent({ commit, dispatch },  { classID, studentID, markList }) {
      await firebase.database().ref(`classes/${classID}/students/${studentID}`).update({markList});
    },
    async fetchAllSubjects({ commit, dispatch }) {
      try {
        const listSubjects = (await firebase.database().ref(`subject`).once('value')).val() || {}
        return Object.keys(listSubjects).map(key => ({ ...listSubjects[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchUserById ({ commit }, id) {
      try {
        const user = (await firebase.database().ref(`/listT`).child(id).once('value')).val() || {};
        return user;
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo ({ commit, dispatch }, {teacherID, subjectData}) {
      try {
      await firebase.database().ref(`listT/${teacherID}/subject/`).update(subjectData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTeacher ({ commit, dispatch }, {teacherID, fullName}) {
      try {
        await firebase.database().ref(`listT/${teacherID}`).update({fullName})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeTeacherFromList ({ commit, dispatch }, {teacherID}) {
      try {
        await firebase.database().ref(`listT/${teacherID}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addNewSubject ({ commit, dispatch }, {teacherID, data}) {
      try {
      await firebase.database().ref(`/listT/${teacherID}/subject`).push(data)
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async getSchedule({ commit, dispatch }, { classID, schedule, id }) {
      try {
        const getSchedule = (await firebase.database().ref(`classes/${classID}/schedule`).once('value')).val() || {};
        console.log( Object.keys(getSchedule).map(key => ({ ...getSchedule[key], id: key })));
        return Object.keys(getSchedule).map(key => ({ ...getSchedule[key], id: key }));
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async pushSchedule ({ commit, dispatch }, {classID, schedule}) {
      try {
       await firebase.database().ref(`classes/${classID}/schedule`).push(schedule);
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async pushHomework ({ commit, dispatch }, {classID, homework}) {
      try {
        await firebase.database().ref(`classes/${classID}/homework`).push(homework);
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async updateHomework ({ commit, dispatch }, {classID, homework, requiredSubjectID}) {
      try {
        await firebase.database().ref(`classes/${classID}/homework/${requiredSubjectID}`).update(homework);
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async updateSchedule ({ commit, dispatch }, {classID, scheduleData, scheduleID}) {
      try {
        await firebase.database().ref(`classes/${classID}/schedule/${scheduleID}`).update(scheduleData);
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async removeSubject ({ commit, dispatch }, {teacherID, subjectID}) {
      try {
      await firebase.database().ref(`/listT/${teacherID}/subject/${subjectID}`).remove()
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async removeStudent ({ commit, dispatch }, {id, idstd}) {
      try {
      await firebase.database().ref(`classes/${id}/students/${idstd}`).remove()
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async getPupil({ commit, dispatch },  { id, idstd, student, password, email }) {
      try {
        const pupil = (await firebase.database().ref(`classes/${id}/students/${idstd}`).once('value')).val() || {};
        return Object.values(pupil).map(key => ({ ...pupil[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteListT ({ commit, dispatch }, { id }) {
      try {
        await firebase.database().ref(`/listT`).child(id).remove();
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async createListT ({ commit, dispatch }, {fullName, password, email}) {
      try {
        const tempApp = firebase.initializeApp(config, "AuxiliaryApplication");
        let userID, teacherData, newUserData;

        await tempApp.auth().createUserWithEmailAndPassword(email, password).then((firebaseUser) => {
            userID = firebaseUser.user.uid;

            firebase.database().ref(`/users/${userID}/info`).set({
              name: fullName,
              isTeacher: true,
              isAdmin: false
            });

            console.log("User " + userID + " created successfully!");
            //I don't know if the next statement is necessary
            tempApp.auth().signOut();
        });

        if (userID) {
          teacherData = {
            fullName: fullName,
            userID: userID,
            isAdmin: false,
            isTeacher: true
          };

          console.log("create new teacher");
          newUserData = await firebase.database().ref(`/listT/`).push(teacherData);
          console.dir(newUserData);
        }

        return { fullName, id: newUserData && newUserData.key}
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },

    async createListPupils ({ commit, dispatch }, {childID, student, password, email}) {
      try {
        const tempAppStud = firebase.initializeApp(config, "AuxiliaryApplicationPup");
        let pupilID, pupilData, newPupilData;

        await tempAppStud.auth().createUserWithEmailAndPassword(email, password).then((firebaseUser) => {
          pupilID = firebaseUser.user.uid;

            firebase.database().ref(`/users/${pupilID}/info`).set({
              name: student,
              isTeacher: false,
              isAdmin: false
            });

            console.log("User " + pupilID + " created successfully!");
            //I don't know if the next statement is necessary
            tempAppStud.auth().signOut();
        });

        if (pupilID) {
          pupilData = {
            student: student,
            pupilID: pupilID,
            isAdmin: false,
            isTeacher: false
          };

          console.log("create new pupil");
          newPupilData = await firebase.database().ref(`/classes/${childID}/students`).push({ pupilData });
          console.dir(newPupilData);
        }

        return { student, id: newPupilData && newPupilData.key}
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    }
}
