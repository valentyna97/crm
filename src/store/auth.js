import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name, isTeacher, isStudent}) {
      try {
        await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          name,
          isTeacher: isTeacher,
          isAdmin: false
        })
        const uidPupils = await dispatch('getUidPupils');
        await firebase.database().ref(`/users/${uidPupils}/info`).set({
          name,
          isTeacher: false,
          isAdmin: false,
          // isStudent: isStudent
        })
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    },
    getUidPupils() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearInfo')
    }
  }
}
