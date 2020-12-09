<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Інформаційна система для підтримки дистанційного навчання</span>
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
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{ "Message_EmailRequired" }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >Введіть емейл</small
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
          {{ "Message_EnterPassword" }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ "Message_MinLength" }} {{ $v.password.$params.minLength.min }}
        </small>
      </div>
    </div>
    <div class="card-action">
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Вхід
          <i class="material-icons right">send</i>
        </button>

      <p class="center">
       Немає акаунту? Зверніться до вашого адміністратора
<!--         <router-link to="/register">Register</router-link>-->
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength } from "vuelidate/lib/validators"
import messages from '@/utils/messages'
// import localizeFilter from '@/filters/localize.filter'
export default {
  name: "login",
  metaInfo() {
    return {
      title: this.$title("Login")
    };
  },
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
      if (messages[this.$route.query.message]) {
          this.$message(messages[this.$route.query.message])
      }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formData);

        await this.$router.push("/");

        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
};
</script>
<style scoped>
@media (max-width: 768px) {
 form{
    width: 300px;
  }
}
   .btn{
    background-color: #82b1ff;
    display: flex;
    margin-top: 10px;

  }

  .btn:hover, .btn-large:hover, .btn-small:hover{
    background-color: #82b1ff;
  }
 .btn{
       display: flex;
    justify-content: center;
 }
</style>