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
        <v-row>
            <v-overlay :value="isLoading">
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
            <v-col style="margin-top: 10%" v-if="(latestHeadlines.length === 0 || latestHeadlines === undefined) && !isLoading">
                <v-alert
                    border="right"
                    colored-border
                    type="info"
                    elevation="2"
                    class="text-center"
                >
                <h4>No record found in database.</h4>
                    A few suggestions<br>
                    Make sure all words are spelled correctly<br>
                    Try different keywords<br>
                    Try more general keywords<br>
                </v-alert>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="6"
                lg="3"
                xs="1"
                v-for="(headLine, index) in latestHeadlines"
                :key="index"
            >
                <v-card
                    elevation="1"
                    min-height="300"
                    max-height="300"
                    style="overflow: hidden;"
                    v-if="index % 2 === 0"
                >

                    <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="headLine.urlToImage"
                    >
                        <v-app-bar
                            flat
                            color="rgba(0, 0, 0, 0)"
                        >
                            <v-toolbar-title class="text-h6 white--text pl-0"></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="white"
                                icon
                                @click="toDetail(headLine)"
                            >
                                <v-icon>mdi-arrow-right-thin</v-icon>
                            </v-btn>
                        </v-app-bar>

                        <v-card-title style="height: 145px;">{{headLine.title}}</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                        {{headLine.publishedAt | formatDate}}
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class="content">{{headLine.content}}</div>
                    </v-card-text>
                </v-card>
                <v-card
                    elevation="1"
                    min-height="300"
                    max-height="300"
                    style="overflow: hidden;"
                    v-else
                >
                    <v-img
                        :src="headLine.urlToImage"
                        class="white--text"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        min-height="300"
                    >
                        <v-overlay
                        absolute
                        color="#3F51B5"
                    >
                        <v-app-bar
                            flat
                            color="rgba(0, 0, 0, 0)"
                            class="mt-5"
                        >
                            <v-toolbar-title class="text-h6 white--text pl-0"></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="white"
                                icon
                                @click="toDetail(headLine)"
                            >
                                <v-icon>mdi-arrow-right-thin</v-icon>
                            </v-btn>
                        </v-app-bar>
                        <v-card-text class="mt-12" style="height: 220px">
                            <div class="white--text">{{headLine.publishedAt | formatDate}}</div>
                            <p class="text-h6 white--text">
                                {{headLine.title}}
                            </p>
                        </v-card-text>
                        </v-overlay>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
    // onApplyFilter() {
    //   this.dialog = false;
    //   this.filterLatestHeadlines(this.headlineSwitch);
    // },
    searchHeadline(e) {
      if (e.target.value.length === 0) {
        this.getLatestHeadlines();
      } else {
        this.getHeadlinesAutocomplete(e);
      }
    },
    toDetail(headline) {
      this.setDetailNews(headline);
      this.$router.push('/detail');
    },
  },
  computed: mapGetters(['latestHeadlines', 'headlinesSources', 'isLoading', 'headlineAutocompletes']),
  created() {
    if (this.latestHeadlines === undefined || this.latestHeadlines.length <= 0) {
      this.getLatestHeadlines();
    }
    if (this.headlinesSources === undefined || this.headlinesSources.length <= 0) {
      this.getHeadlinesSources();
    }
  },
};
</script>
<style scoped>
    .content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
