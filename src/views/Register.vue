<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Адміністративна панель</span>
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
        <label for="email">{{ "Message_EmailRequired" }}</label>
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
        <label for="password">{{ "Password" }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Enter password
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ "Message_MinLength" }}
          {{ $v.password.$params.minLength.min }}.
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">{{ "Name" }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message_EnterName" }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ "AcceptRules" }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "Register" }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "HasAccount" }}
        <router-link to="/login">{{ "Login" }}</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "register",
  metaInfo() {
    return {
      title: this.$title("Register")
    };
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
};
</script>
<!--<template>-->
<!--  <div class="ui middle aligned center aligned grid">-->
<!--    <div class="column">-->
<!--      <form class="ui large form">-->
<!--        <div class="ui stacked secondary segment">-->
<!--          <div class="field"></div>-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input large">-->
<!--              <i class="mail icon"></i>-->
<!--              <input    id="email"-->
<!--                        type="text"-->
<!--                      placeholder="E-mail address"-->
<!--                      v-model.trim="email"-->
<!--                      :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="input-field">-->
<!--            <input-->
<!--                    id="email"-->
<!--                    type="text"-->
<!--                    v-model.trim="email"-->
<!--                    :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"-->
<!--            >-->
<!--            <label for="email">{{'Message_EmailRequired'}}</label>-->
<!--            <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required"> {{'Message_EmailRequired'}}</small>-->
<!--            <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'Message_EmailValid'}}l</small>-->
<!--          </div>-->
<!--          <div class="input-field">-->
<!--            <input-->
<!--                    id="password"-->
<!--                    type="password"-->
<!--                    v-model.trim="password"-->
<!--                    :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"-->

<!--            >-->
<!--            <label for="password">{{'Password'}}</label>-->
<!--            <small-->
<!--                    class="helper-text invalid"-->
<!--                    v-if="$v.password.$dirty && !$v.password.required"-->
<!--            >-->
<!--              Enter password-->
<!--            </small>-->
<!--            <small-->
<!--                    class="helper-text invalid"-->
<!--                    v-else-if="$v.password.$dirty && !$v.password.minLength"-->
<!--            >-->
<!--              {{'Message_MinLength'}} {{$v.password.$params.minLength.min}}.-->
<!--            </small>-->
<!--          </div>-->
<!--          <div class="input-field">-->
<!--            <input-->
<!--                    id="name"-->
<!--                    type="text"-->
<!--                    v-model.trim="name"-->
<!--                    :class="{invalid: $v.name.$dirty && !$v.name.required}"-->
<!--            >-->
<!--            <label for="name">{{'Name'}}</label>-->
<!--            <small class="helper-text invalid"  v-if="$v.name.$dirty && !$v.name.required">{{'Message_EnterName'}}</small>-->
<!--          </div>-->
<!--          <div-->
<!--                  class="ui fluid large pink submit button"-->
<!--                  @click="registerButtonPressed"-->
<!--          >Register</div>-->
<!--        </div>-->

<!--        <div class="ui error message"></div>-->
<!--      </form>-->

<!--      <div class="ui message">-->
<!--        Have an account already?-->
<!--        <router-link :to="{ name: 'login' }">Login</router-link>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    import { email, required, minLength } from 'vuelidate/lib/validators'-->
<!--    import firebase from "firebase";-->
<!--    export default {-->
<!--        data: () => ({-->
<!--            email: '',-->
<!--            password: '',-->
<!--            name: ''-->
<!--        }),-->
<!--        validations: {-->
<!--            email: { email, required },-->
<!--            password: { required, minLength: minLength(6) },-->
<!--            name: { required }-->
<!--        },-->
<!--        methods: {-->
<!--            async registerButtonPressed() {-->
<!--                const formData = {-->
<!--                    email: this.email,-->
<!--                    password: this.password,-->
<!--                    name: this.name-->
<!--                }-->
<!--                try {-->
<!--                    await this.$store.dispatch('register', formData)-->
<!--                    this.$router.push('/')-->
<!--                    // eslint-disable-next-line no-empty-->
<!--                } catch (e) {}-->
<!--                try {-->
<!--                    var {-->
<!--                        user-->
<!--                    } = await firebase-->
<!--                        .auth()-->
<!--                        .createUserWithEmailAndPassword(this.email, this.password);-->
<!--                    // signout-->
<!--                    firebase-->
<!--                        .auth()-->
<!--                        .signOut()-->
<!--                        .then(user => {-->
<!--                            this.$router.push("/login");-->
<!--                        });-->
<!--                } catch (error) {-->
<!--                    console.log(error.message);-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->

