<template>
  <v-container style="width: 100%;"> 
    <v-card>
      <v-layout >
        <v-app-bar color="light-blue" prominent style="width: 100%;" >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My E-Learning</v-toolbar-title>

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
                <v-list-item-title style="color:rgb(16, 102, 152); font-weight: bolder;">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="height: 100%;">
          <v-app>
            <v-container class="content-container">
              <!-- Left Aside -->
              <div class="left">
                <h5 style="color: lightslategray;font-family: sans-serif;">Join Us</h5>
                <h2 class="ww">Online</h2>
                <h1 style="font-weight: bolder;font-size: 60px; color: rgb(16, 102, 152);font-family: sans-serif;">Education</h1>
                <p style="text-align: left;color: lightslategray;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                  magna aliqua.</p>
                  <v-btn style="background-color: lightblue;color: rgb(16, 102, 152);border-radius: 10px;" @click="navigateToCourselist">Get Started</v-btn>

              </div>

              <!-- Right Aside -->
              <div class="right">
                <v-img src="../assets/homepage4.jpg"></v-img>
              </div>
            </v-container>
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

const navigateToStudentlist = () => {
  router.push({ name: 'studentlist' });
};
const drawer = ref(false);
const items = ref([
  { title: 'Home', action: navigateToHomePage },
  { title: 'Course List', action: navigateToCourselist },
  {title : 'Students' , action : navigateToStudentlist}
]);


</script>
<style>
.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  padding: 10px;
  background-color: white;
  /* Optional for contrast */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Adds the shadow */
  border-radius: 8px;
  /* Optional: for rounded corners */
}

.left,
.right {
  width: 48%;
  margin-left: 5%;
  align-content: center;
}

.left {
  text-align: left;
  margin-right: 2%;
  margin-top: 10%;

}

.right {
  text-align: right;
  margin-left: 2%;
  margin-top: 10%;
}

.ww {
  font-family: sans-serif;
  font-weight: bold;
  color: lightblue;
}
</style>