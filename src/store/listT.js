import firebase from 'firebase/app'
export default {
  // mutations: {
  //   SET_CURRENT_CATEGORY (state, currentCategoryId) {
  //     state.currentCategory = currentCategoryId
  //   }
  // },
  actions: {
    async fetchCategories ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
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
    // async fetchCategoryById ({ commit, dispatch }, id) {
    //   try {
    //     const uid = await dispatch('getUid')
    //     const listT = (await firebase.database().ref(`/users/${uid}/listT`).child(id).once('value')).val() || {}
    //     return { ...listT, id }
    //   } catch (e) {
    //     commit('setError', e)
    //     throw e
    //   }
    // },
    async updateListT ({ commit, dispatch }, { title, id, limit, value}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`listT`).child(id).update({ title, limit, value})
        // console.log(list)
        // commit('SET_CURRENT_CATEGORY', id)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteListT ({ commit, dispatch }, { id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/listT`).child(id).remove()
        // console.log(list)
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
        commit('setError', e)
        throw e
      }
    }
  }
}
