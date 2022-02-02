<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container class="pa-xs-0">
        <div class="d-flex align-center ma-xs-n5 pa-xs-n5">
            <h1 class="font-weight-medium">News</h1>
        </div>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>
</template>
<script>
export default {
  name: 'Header',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
  @media only screen and (max-width: 960px) {
    .pa-xs-0{
      padding: 0px;
    }
  }
</style>
