<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container>
        <div class="d-flex align-center">
          <h1 class="font-weight-medium">News</h1>
        </div>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
