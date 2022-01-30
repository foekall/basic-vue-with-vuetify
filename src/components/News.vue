<template>
    <!-- eslint-disable max-len -->
    <v-container fluid>
        <v-row>
            <v-col>
                <h1 class="font-weight-light primary--text">Headlines</h1>
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
                        <v-toolbar-title>Please select the Source that you want to filter</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                text
                                dark
                                @click="dialog = false; headlineSwitch = []"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                dark
                                text
                                @click="dialog = false"
                                >
                                Apply
                            </v-btn>
                        </v-toolbar-items>
                        </v-toolbar>
                        <v-container fluid>
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
                                        :value="headline.id"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                cols="12"
                md="4"
                sm="6"
                lg="3"
                xs="1"
                v-for="(headLine, index) in latestHeadlines.articles"
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
                            >
                                <arrow-right class="primary--text" />
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
                            >
                                <arrow-right class="white--text" />
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
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';
// import FilterMenu from 'vue-material-design-icons/FilterMenu.vue';

export default {
  name: 'News',
  components: { ArrowRight },
  data() {
    return {
      latestHeadlines: [],
      headlinesSources: [],
      dialog: false,
      headlineSwitch: [],
    };
  },
  methods: {

    // fetching headline news from backend
    getLatestHeadlines() {
      fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e')
        .then((response) => response.json())
        .then((data) => {
          this.latestHeadlines = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // fetching headline source from backend to show in filter menu
    getLatestHeadlinesSource() {
      fetch('https://newsapi.org/v2/sources?apiKey=099148be22804e849a0c6fe022b7cf5e')
        .then((response) => response.json())
        .then((data) => {
          this.headlinesSources = data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

  },
  created() {
    this.getLatestHeadlines();
    this.getLatestHeadlinesSource();
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
