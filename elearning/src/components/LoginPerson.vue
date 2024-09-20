<template>
     <v-app>
          <p class="title">E-learning Login</p>
          <p>It will be enough to click on the button at the bottom to log into E-learning Classroom safely.
               To be able to log in to Google Classroom, you must have a Google account.
               Click here or the button at the bottom for E-learning Classroom login procedures.
          </p>
          <v-container style="display: flex; justify-content: center;">
               <v-form style="width: 40%;">
                    <div class="form-floating mb-3">
                         <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                         <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                         <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                         <label for="floatingPassword">Password</label>
                    </div>
                    <v-btn style="background-color: green; color: white; margin: 10px auto; width: 100%;"
                         @click="navigatetoHomepage">
                         Login
                    </v-btn>
               </v-form>

          </v-container>


     </v-app>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const roter = useRouter();

const navigatetoHomepage = () => {
     roter.push({ name: 'home' });
}
</script>
<style>
.title {
     text-align: center;
     font-family: sans-serif;
     font-weight: bold;
     font-size: xx-large;
}

p {
     text-align: center;
     font-family: sans-serif;
     font-weight: normal;
     font-size: large;
}
</style>