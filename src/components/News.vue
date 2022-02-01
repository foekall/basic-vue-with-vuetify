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
                <FilterNews />
            </v-col>
        </v-row>
        <Article />
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Article from './Article.vue';
import FilterNews from './FilterNews.vue';

export default {
  name: 'News',
  data() {
    return {
      dialog: false,
      historyBack: false,
    };
  },
  methods: {
    ...mapActions(['getLoadingStatus', 'getHeadlinesAutocomplete']),
    searchHeadline(e) {
      if (e.target.value.length === 0) {
        this.getLatestHeadlines();
      } else {
        this.getHeadlinesAutocomplete(e);
      }
    },
  },
  computed: mapGetters(['isLoading', 'headlineAutocompletes']),
  created() {
  },
  components: { Article, FilterNews },
};
</script>
