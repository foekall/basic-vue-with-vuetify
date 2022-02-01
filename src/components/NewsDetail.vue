<template>
  <v-container>
    <v-row style="margin-top: 3%">
      <v-col>
        <v-btn
          color="primary lighten-2 mr-2"
          dark
          @click="goBack()"
          data-cy="goback"
        >
          Back
        </v-btn>
        <v-btn
          color="primary lighten-2"
          dark
          @click="dialog = true; title = objNews.title"
          data-cy="edit-title"
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
                data-cy="txttitle"
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
                data-cy="update"
                @click="updateNewsTitle(objNews)"
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
        <SideBar />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import SideBar from './SideBar.vue';

export default {
    name: "NewsDetail",
    data() {
        return {
            dialog: false,
            valid: true,
            title: "",
            // validate the news title character limit
            titleRules: [
                (v) => !!v || "News title is required",
                (v) => (v && v.length <= 100) || "News title must be less than 100 characters",
            ],
        };
    },
    methods: {
        ...mapActions(["updateTitle"]),
        goBack() {
            // go back to home page
            this.$router.push("/");
        },
        validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.title = this.objNews.title;
        },
        updateNewsTitle(news) {
            this.validate();
            this.dialog = false;
            const arrNews = news;
            arrNews.title = this.title;
            this.updateTitle(arrNews);
        },
    },
    computed: mapGetters(["objNews"]),
    created() {
        if (this.objNews === undefined || this.objNews.length <= 0) {
            this.$router.push("/");
        }
    },
    components: { SideBar }
};
</script>
