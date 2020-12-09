<template>
      <div class="col s12 m6">
          <div>
              <h4>Додати вчителя</h4>
            <form @submit.prevent="addTeacher">
              <div class="input-field">
                <input
                        id="name1"
                        type="text"
                        v-model="fullName"
                        :class="{invalid: $v.fullName.$dirty && !$v.fullName.required}"
                >
                <label for="name1">Прізвище та ім'я вчителя</label>
                <span v-if="$v.fullName.$dirty && !$v.fullName.required"
                      class="helper-text invalid">Message_CategoryTitle</span>
              </div>

              <div class="input-field">
                <input
                  id="email"
                  type="text"
                  v-model.trim="email"
                  :class="{
                    invalid:
                      ($v.email.$dirty && !$v.email.required) ||
                      ($v.email.$dirty && !$v.email.email)
                  }"
                />
                <label for="email">Введіть email</label>
                <small
                  class="helper-text invalid"
                  v-if="$v.email.$dirty && !$v.email.required"
                  >{{ "Message_EmailRequired" }}</small
                >
                <small
                  class="helper-text invalid"
                  v-else-if="$v.email.$dirty && !$v.email.email"
                  >{{ "Message_EmailValid" }}l</small
                >
              </div>

              <div class="input-field">
                <input
                  id="password"
                  type="password"
                  v-model.trim="password"
                  :class="{
                    invalid:
                      ($v.password.$dirty && !$v.password.required) ||
                      ($v.password.$dirty && !$v.password.minLength)
                  }"
                />
                <label for="password">Пароль</label>
                <small
                  class="helper-text invalid"
                  v-if="$v.password.$dirty && !$v.password.required"
                >
                  Введіть пароль
                </small>
                <small
                  class="helper-text invalid"
                  v-else-if="$v.password.$dirty && !$v.password.minLength"
                >
                  Мінімальна довжина
                  {{ $v.password.$params.minLength.min }}.
                </small>
              </div>


              <button class="btn waves-effect waves-light" type="submit">
                Додати
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>
<script>
import M from 'materialize-css'

import {required, minValue, minLength, email} from 'vuelidate/lib/validators'
export default {
  
  // components: { Multiselect },
  data: () => ({
      visible: true,
      fullName: '',
      password: '',
      email: ''
  }),
  validations: {
    email: { email, required },
    fullName: { required },
    password: { required, minLength: minLength(6) },
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select);
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
          fullName: this.fullName,
          password: this.password,
          email: this.email
        });
        this.fullName = '';
        this.password = '';
        this.email = '';
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
.btn{
    background-color: #82b1ff;
  }

  .btn:hover, .btn-large:hover, .btn-small:hover{
    background-color: #82b1ff;
  }
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