<template>
  <v-container>
    <v-row style="margin-top: 3%">
      <v-col>
        <v-btn
          color="primary lighten-2 mr-2"
          dark
          @click="goBack()"
        >
          Back
        </v-btn>
        <v-btn
          color="primary lighten-2"
          dark
          @click="dialog = true; title = objNews.title"
        >
          Edit
        </v-btn>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <v-card>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-card-title class="text-h5 grey lighten-2">
              Edit news headline
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="title"
                :counter="100"
                :rules="titleRules"
                label="Title"
                required
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="reset()"
              >
                Reset
              </v-btn>
              <v-btn
                color="primary"
                text
                :disabled="!valid"
                @click="dialog = false"
              >
                Update
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <h1>{{objNews.title}}</h1>
        <p class="text-disabled"> <v-icon x-small>mdi-fountain-pen-tip</v-icon> {{objNews.author}} <v-icon x-small>mdi-clock-outline</v-icon> {{objNews.publishedAt | formatDate}}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-img :src="objNews.urlToImage"></v-img><br>
        <p>
          {{objNews.content}} <a :href="objNews.url" target="_blank">Read More</a>
        </p>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-list class="pt-0">
          <template>
            <v-list-item
              class="mt-n3"
              three-line
              v-for="(headlin,i) in objVisitedHeadlines"
              :key="i"
            >
              <v-list-item-avatar>
                <v-img :src="headlin.urlToImage"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title @click="toDetail(headlin)" style="overflow: visible; cursor: pointer;" class="text-wrap">{{headlin.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NewsDetail',
  data() {
    return {
      dialog: false,
      valid: true,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 100) || 'Title must be less than 100 characters',
      ],
    };
  },
  methods: {
    ...mapActions(['setDetailNews']),
    toDetail(headline) {
      this.setDetailNews(headline);
      this.$router.push('/detail');
    },
    goBack() {
      this.$router.push('/');
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.title = this.objNews.title;
    },
  },
  computed: mapGetters(['objNews', 'objVisitedHeadlines']),
  created() {
  },
};
</script>
