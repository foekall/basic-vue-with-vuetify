<template>
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
                            data-cy="open-filter"
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
                                    data-cy="clear"
                                >
                                    Clear
                                </v-btn>
                                <v-btn
                                    dark
                                    text
                                    @click="filterLatestHeadlines(headlineSwitch); dialog = false"
                                    data-cy="apply"
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
                                        data-cy="news-switch"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FilterNews',
  data() {
    return {
      dialog: false,
      headlineSwitch: [],
      historyBack: false,
    };
  },
  methods: {
    ...mapActions(['getHeadlinesSources', 'filterLatestHeadlines']),
  },
  computed: mapGetters(['headlinesSources']),
  created() {
    // check if user is back from details page
    if (this.headlinesSources === undefined || this.headlinesSources.length <= 0) {
      this.getHeadlinesSources();
    }
  },
};
</script>
