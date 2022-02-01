<template>
    <!-- eslint-disable max-len -->
    <v-container>
        <v-row>
            <v-col
                cols="12"
                md="2"
            >
                <h1 class="font-weight-light primary--text">Headlines</h1>
            </v-col>
            <v-col
                cols="12"
                md="8"
            >
                <v-text-field
                    label="Type here to search news"
                    @keyup="searchHeadline($event)"
                    prepend-icon="mdi-text-box-search-outline"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-dialog
                    v-model="dialog"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            class="float-right"
                        >
                        <v-icon>mdi-tune</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-toolbar
                            dark
                            color="primary"
                        >
                            <v-btn
                                text
                                dark
                                @click="dialog = false;"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Please select the Source that you want to filter</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn
                                    v-if="headlineSwitch === undefined || headlineSwitch.length > 0"
                                    text
                                    dark
                                    @click="headlineSwitch = []"
                                >
                                    Clear
                                </v-btn>
                                <v-btn
                                    dark
                                    text
                                    @click="filterLatestHeadlines(headlineSwitch); dialog = false"
                                >
                                    Apply
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-container>
                            <v-row no-gutters>
                                <v-col
                                    v-for="(headline, s) in headlinesSources.sources"
                                    :key="s"
                                    cols="12"
                                    xs="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-switch
                                        v-model="headlineSwitch"
                                        color="primary"
                                        :label="headline.name"
                                        :value="headline.name"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <Article />
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Article from './Article.vue';

export default {
  name: 'News',
  data() {
    return {
      dialog: false,
      headlineSwitch: [],
      historyBack: false,
    };
  },
  methods: {
    ...mapActions(['getLatestHeadlines', 'getHeadlinesSources', 'filterLatestHeadlines', 'getLoadingStatus', 'getHeadlinesAutocomplete', 'setDetailNews']),
    searchHeadline(e) {
      if (e.target.value.length === 0) {
        this.getLatestHeadlines();
      } else {
        this.getHeadlinesAutocomplete(e);
      }
    },
    toDetail(headline) {
      // store selected headline to state to show in details page and go to detail page
      this.setDetailNews(headline);
      this.$router.push('/detail');
    },
  },
  computed: mapGetters(['latestHeadlines', 'headlinesSources', 'isLoading', 'headlineAutocompletes']),
  created() {
    // // check if user is back from details page
    // if (this.latestHeadlines === undefined || this.latestHeadlines.length <= 0) {
    //   this.getLatestHeadlines();
    // }
    // check if user is back from details page
    if (this.headlinesSources === undefined || this.headlinesSources.length <= 0) {
      this.getHeadlinesSources();
    }
  },
  components: { Article },
};
</script>
<!--style scoped>
    .content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style-->
