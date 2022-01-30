<template>
    <!-- eslint-disable max-len -->
    <v-container fluid>
        <v-row>
            <v-col>
                <h1 class="font-weight-light primary--text">Headlines</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col
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
                        <v-card-text class="mt-12 pt-12">
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

export default {
  name: 'News',
  components: { ArrowRight },
  data() {
    return {
      latestHeadlines: [],
    };
  },
  created() {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e')
      .then((response) => response.json())
      .then((data) => {
        this.latestHeadlines = data;
      })
      .catch((err) => {
        console.error(err);
      });
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
