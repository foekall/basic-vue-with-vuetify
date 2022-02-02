<template>
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
                <v-list-item-title data-cy="visited-headline" @click="toDetail(headlin)" style="overflow: visible; cursor: pointer;" class="text-wrap">{{headlin.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SideBar',
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(['setDetailNews', 'updateTitle']),
    toDetail(headline) {
      // update selected headline into state to show in detail page
      this.setDetailNews(headline);
    },
  },
  computed: mapGetters(['objVisitedHeadlines']),
  created() {
  },
};
</script>