import firebase from 'firebase/app'
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
    async fetchUserById ({ commit }, id) {
      try {
        const user = (await firebase.database().ref(`/listT`).child(id).once('value')).val() || {};
        return user;
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSubById ({ commit, dispatch }, id) {
      try {
        const Sub = (await firebase.database().ref(`/listT/${id}/subject`).once('value')).val() || {};
        return Sub;
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateListT ({ commit, dispatch }, { title, id, limit, value}) {
      try {
        await firebase.database().ref(`listT`).child(id).update({ title, limit, value})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async deleteListT ({ commit, dispatch }, { id }) {
      try {
        await firebase.database().ref(`/listT`).child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createListT ({ commit, dispatch }, {title}) {
      try {
        const list = await firebase.database().ref(`/listT/`).push({ title:title })
        return { title, id: list.key}
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
  }
}
