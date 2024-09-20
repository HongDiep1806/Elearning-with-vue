<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My E-Leaning</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>
            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
              <v-list-item-content>
                <v-list-item-title style="color:rgb(16, 102, 152) ; font-weight: bolder;">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 100%;">
          <v-app>
            <h2 class="welcome">Welcome to My E-learning</h2>
          </v-app>

        </v-main>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToHomePage = () => {
  router.push({ name: 'home' });
};

const navigateToCourselist = () => {
  router.push({ name: 'courselist' });
};
const drawer = ref(false);
const items = ref([
  { title: 'Home', action: navigateToHomePage },
  { title: 'Course List', action: navigateToCourselist },
]);


</script>
<style>
.welcome {
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: xx-large;
  margin: 50px;
  color: rgb(16, 102, 152);

}
</style>