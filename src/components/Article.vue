<template>
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Article',
  methods: {
    ...mapActions(['getLatestHeadlines', 'getLoadingStatus', 'setDetailNews']),
    toDetail(headline) {
      // store selected headline to state to show in details page and go to detail page
      this.setDetailNews(headline);
      this.$router.push('/detail');
    },
  },
  computed: mapGetters(['latestHeadlines', 'isLoading']),
  created() {
    // check if user is back from details page
    if (this.latestHeadlines === undefined || this.latestHeadlines.length <= 0) {
      this.getLatestHeadlines();
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
