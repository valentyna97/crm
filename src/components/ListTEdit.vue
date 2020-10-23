<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Редагувати список вчителів'}}</h4>
      </div>
<!--      <form @submit.prevent="submitHandler">-->
<!--&lt;!&ndash;        <div class="input-field" >&ndash;&gt;-->
<!--&lt;!&ndash;          <select ref="select" v-model="current" :clear-on-select="true">&ndash;&gt;-->
<!--&lt;!&ndash;            <option&ndash;&gt;-->
<!--&lt;!&ndash;            v-for="l of listT"&ndash;&gt;-->
<!--&lt;!&ndash;              :key="l.id"&ndash;&gt;-->
<!--&lt;!&ndash;              :value="l.id"&ndash;&gt;-->
<!--&lt;!&ndash;            >{{l.title}}</option>&ndash;&gt;-->
<!--&lt;!&ndash;          </select>&ndash;&gt;-->
<!--&lt;!&ndash;          <label>{{'Вибрати вчителя'}}</label>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->

<!--        <div class="input-field">-->
<!--          <input-->
<!--              id="name"-->
<!--              type="text"-->
<!--              v-model="title"-->
<!--              :class="{invalid: $v.title.$dirty && !$v.title.required}"-->
<!--          >-->
<!--          <label for="name">{{'Ім"я і прізвище вчителя'}}</label>-->
<!--          <span-->
<!--            v-if="$v.title.$dirty && !$v.title.required"-->
<!--            class="helper-text invalid"-->
<!--          >-->
<!--            {{'Message_CategoryTitle'}}-->
<!--          </span>-->
<!--        </div>-->
<!--        <div class="input-field">-->
<!--        <div class="input-field">-->
<!--          <input-->
<!--                  id="limit"-->
<!--                  type="number"-->
<!--                  v-model.number="limit"-->
<!--                  :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"-->
<!--          >-->
<!--          <label for="limit">Вкажіть кількість годин</label>-->
<!--          <span-->
<!--                  v-if="$v.limit.$dirty && !$v.limit.minValue"-->
<!--                  class="helper-text invalid"-->
<!--          >-->
<!--            {{'Message_MinLength'}} {{$v.limit.$params.minValue.min}}-->
<!--          </span>-->
<!--        </div>-->
<!--        <div class="input-field">-->
<!--          <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">-->
<!--            <template slot="selection" slot-scope="{ value, isOpen }"><span class="multiselect__single" v-if="value &amp;&amp; !isOpen">{{ value }} options selected</span></template>-->
<!--          </multiselect>-->
<!--&lt;!&ndash;          <label>Оберіть клас</label>&ndash;&gt;-->
<!--        </div>-->
<!--        <button class="btn waves-effect waves-light" type="submit">-->
<!--          {{'Оновити'}}-->
<!--          <i class="material-icons right">send</i>-->
<!--        </button>-->
<!--      </form>-->
      <form @submit.prevent = "submitHandler">
        <div class="input-field">
          <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{'Ім"я і прізвище вчителя'}}</label>
          <span v-if="$v.title.$dirty && !$v.title.required"
                class="helper-text invalid">{{'Message_CategoryTitle' }}</span>
        </div>
    
        <div class="input-field">
          <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Вкажіть кількість годин</label>
          <span v-if="$v.limit.$dirty && !$v.limit.minValue"
                class="helper-text invalid">{{'Message_MinLength' }}{{$v.limit.$params.minValue.min}}</span>
        </div>
        <!--              <div class="input-field">-->
        <!--                <select ref="select" v-model="cc" multiple>-->
        <!--                  <option disabled value="">Оберіть клас</option>-->
        <!--                  <option v-for="c of classT"-->
        <!--                        :key="c.id"-->
        <!--                        :value="c.id">{{c.id}}</option>-->
        <!--                </select>-->
        <!--                <label>Оберіть клас</label>-->
        <!--              </div>-->
        <div class="input-field">
          <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
            <template slot="selection" slot-scope="{ value, isOpen }"><span class="multiselect__single" v-if="value &amp;&amp; !isOpen">{{ value }} options selected</span></template>
          </multiselect>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          {{'Додати'}}
          <i class="material-icons right">send</i>
        </button>
      </form>
      <form @submit.prevent="removeElement">
        <button class="btn waves-effect waves-light btn-dlt"> {{'Видалити'}} <i class="material-icons right" type="submit">delete</i></button>
      </form>
    </div>
  </div>
</template>
<script>
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
import Multiselect from "vue-multiselect";
// import localizeFilter from '@/filters/localize.filter'
export default {
  props: {
      listT: {
          type: Array,
          required: true
      }
  },
    components: { Multiselect },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    value: [],
    options: [
        { name: 'Українська мова', id: 1},
        { name: 'Математика', id: 2},
        { name: 'Зарубіжна література', id: 3}
      ]
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  // watch: {
  //     current(catId) {
  //         const {title, limit, value} = this.listT.find(c => c.id === catId)
  //         this.title = title,
  //         this.limit = limit,
  //         this.value = value
  //     }
  // },
  created () {
    let index = this.listT.findIndex(list => list.id === this.listFromState)
    index = index >= 0 ? index : 0
      // console.log(index)
    const { id, title, limit, value} = this.listT[index]
    // this.current = id,
    this.title = title,
    // this.limit = limit,
    this.value = value
    // this.cc = cc
  },
  methods: {
    async removeElement () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const listData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
          value: this.value
        }
        await this.$store.dispatch('deleteListT', listData)
        this.title = '',
        this.id = '',
        this.limit = 1,
        this.value = []
        this.$v.$reset()
        // this.$message(localizeFilter('Category_HasBeenDelete'))
        this.$emit('delete', listData)
          // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const listData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
          value: this.value
        }
        await this.$store.dispatch('updateListT', listData)
        this.$message('Category_HasBeenUpdated')
        this.$emit('updated', listData)
          // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    // this.select1 = M.FormSelect.init(this.$refs.select1)
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
    // if (this.select1 && this.select1.destroy) {
    //     this.select1.destroy()
    // }
  }
}
</script>
<style computed>
  .btn-dlt{
    margin-top: 15px;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>