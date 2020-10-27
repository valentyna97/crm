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
          >{{ "Message_EmailValid" }}</small
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
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "Login" }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "NoAccount" }}
        <router-link to="/register">{{ "Register" }}</router-link>
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
<!--          <div class="field">-->
<!--            <div class="ui left icon input large">-->
<!--              <i class="user icon"></i>-->
<!--              <input-->
<!--                      type="text"-->
<!--                      name="email"-->
<!--                      placeholder="E-mail address"-->
<!--                      v-model="email"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input large">-->
<!--              <i class="lock icon"></i>-->
<!--              <input-->
<!--                      type="password"-->
<!--                      name="password"-->
<!--                      placeholder="Password"-->
<!--                      v-model="password"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="ui fluid large teal submit button" @click="loginButtonPressed">Login</div>-->
<!--        </div>-->

<!--        <div class="ui error message"></div>-->
<!--      </form>-->

<!--      <div class="ui message">-->
<!--        Don't have an account?-->
<!--        <router-link :to="{ name: 'register' }">Register</router-link>-->
<!--        &lt;!&ndash; <button @click="signOut">SignOut</button> &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    import firebase from "firebase";-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                email: "",-->
<!--                password: ""-->
<!--            };-->
<!--        },-->
<!--        created() {-->
<!--            firebase.auth().onAuthStateChanged(userAuth => {-->
<!--                if (userAuth) {-->
<!--                    firebase-->
<!--                        .auth()-->
<!--                        .currentUser.getIdTokenResult()-->
<!--                        .then(tokenResult => {-->
<!--                            console.log(tokenResult.claims);-->
<!--                        });-->
<!--                }-->
<!--            });-->
<!--        },-->
<!--        methods: {-->
<!--            async loginButtonPressed() {-->
<!--                try {-->
<!--                    const {-->
<!--                        user-->
<!--                    } = await firebase-->
<!--                        .auth()-->
<!--                        .signInWithEmailAndPassword(this.email, this.password);-->
<!--                } catch (error) {-->
<!--                    console.log(error);-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->