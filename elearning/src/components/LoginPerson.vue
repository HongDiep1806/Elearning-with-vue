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
                         <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="IRN">
                         <label for="floatingInput">IRN</label>
                    </div>
                    <div class="form-floating">
                         <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
                         <label for="floatingPassword">Password</label>
                    </div>
                    <v-btn style="background-color: green; color: white; margin: 10px auto; width: 100%;"
                         @click="navigatetoHomepage">
                         Login
                    </v-btn>
                    <v-btn style="background-color: black; color: white; margin: 10px auto; width: 100%;"
                         @click="navigateToCreateAccount">
                         Create new one
                    </v-btn>
               </v-form>

          </v-container>


     </v-app>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import bcrypt from 'bcryptjs';
import type {User} from '@/types/User.ts';
import axios from 'axios';

const IRN = ref('');
const password = ref('');
const hashedPassword = ref('');
const roter = useRouter();

const users = ref<User[]>([]);
const getUsers = async() => {
     const response = await axios.get('https://localhost:7117/api/User');
     users.value = response.data;
}
const encryptPassword = async() => {
     const saltRounds = 'nhibeo';  
      hashedPassword.value = await bcrypt.hash(password.value, saltRounds);
}

const existedUser = ref(false);
const checkLogin = async() => {
     // encryptPassword();
     await getUsers();
     users.value.forEach(user => {
      if(user.IRN==IRN.value && user.Password==password.value){
       existedUser.value = true;    
       return;
      }    
     });
}
const navigatetoHomepage = async() => {
     await checkLogin();
     console.log(users);
     console.log(password.value);
     if(existedUser.value===true){
          await roter.push({ name: 'home' });     
     }else{
          await roter.push({ name: 'login' });
          alert('Wrong IRN or Password');
     }
     
}

const navigateToCreateAccount = async() => {
    await roter.push({ name: 'createAccount' });
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