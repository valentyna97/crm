<template>
      <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Додати вчителя</h4>
            </div>
            <form @submit.prevent="addTeacher">
              <div class="input-field">
                <input
                        id="name1"
                        type="text"
                        v-model="title"
                        :class="{invalid: $v.title.$dirty && !$v.title.required}"
                >
                <label for="name1">{{'Ім"я і прізвище вчителя'}}</label>
                <span v-if="$v.title.$dirty && !$v.title.required"
                      class="helper-text invalid">{{'Message_CategoryTitle' }}</span>
              </div>
              <button class="btn waves-effect waves-light" type="submit">
                                {{'Додати'}}
                                <i class="material-icons right">send</i>
                              </button>
            </form>
          </div>
        </div>
</template>
<script>
import M from 'materialize-css'
// import Multiselect from 'vue-multiselect'
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  
  // components: { Multiselect },
  data: () => ({
      visible: true,
    select: [],
    title: '',
    limit: 1,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  
  methods: {
    async addTeacher () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const list = await this.$store.dispatch('createListT', {
          title: this.title,
          // limit: this.limit,
          // value: this.value
        });
        this.title = '';
        // this.limit = 1
        // this.value=[]
        this.$v.$reset();
        this.$emit('created', list)
          // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
    destroyed () {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  form{
    padding: 0 25px 25px 25px;
  }
  h4{
    margin: 20px 25px;
  }
  .show{
    display: none;
  }
</style>