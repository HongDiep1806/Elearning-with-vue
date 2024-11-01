<template>
    <v-app>
      <p class="title">E-learning Create New Account</p>
      <p>It will be enough to click on the button at the bottom to log into E-learning Classroom safely.
        To be able to log in to Google Classroom, you must have a Google account.
        Click here or the button at the bottom for E-learning Classroom login procedures.
      </p>
      <v-container style="display: flex; justify-content: center;">
        <v-form style="width: 40%;">
          <v-text-field v-model="IRN" label="IRN" placeholder="IRN"></v-text-field>
  
          <v-text-field v-model="name" label="Name" placeholder="Name"></v-text-field>
  
          <v-text-field v-model="password" label="Password" placeholder="Password" type="password"></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirm Password" placeholder="Confirm Password"
            type="password">
          </v-text-field>
  
          <!-- Formatted Date of Birth Field -->
          <v-text-field v-model="formatedDOB" label="Date of Birth" placeholder="Date of Birth" readonly></v-text-field>
  
          <!-- Date Picker -->
          <v-date-picker color="primary" v-model="dob"></v-date-picker>
  
          <v-text-field v-model="address" label="Address" placeholder="Address"></v-text-field>
  
          <v-text-field v-model="avatar" label="Avatar" placeholder="Avatar"></v-text-field>
  
          <v-autocomplete label="Select your role" :items="roles" item-title="item" item-value="item"
            v-model="selectedRole">
          </v-autocomplete>
  
          <v-btn style="background-color: black; color: white; margin: 10px auto; width: 100%;"
            @click="createUser">
            Create new one
          </v-btn>
        </v-form>
      </v-container>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import bcrypt from 'bcryptjs';
  import axios from 'axios';
  
  const IRN = ref('');
  const name = ref('');
  const password = ref('');
  const hashedPassword = ref();
  const confirmPassword = ref('');
  const dob = ref(null); // Initialize with null or an empty value
  const formatedDOB = ref('');
  const address = ref('');
  const router = useRouter();
  const roles = ref(['Student', 'Teacher', 'Admin']);
  const selectedRole = ref('');
  const role = ref();
  const avatar = ref('');
  
  const createUser = async () => {
    try {
      if (selectedRole.value === 'Student') {
        role.value = 0;
      } else if (selectedRole.value === 'Teacher') {
        role.value = 1;
      } else if (selectedRole.value === 'Admin') {
        role.value = 2;
      }
      await axios.post('https://localhost:7117/api/User', {
        irn: IRN.value,
        name: name.value,
        password: password.value,
        dob: dob.value,
        address: address.value,
        userType: role.value,
        avatar: avatar.value,
      });
      alert('Create user successfully');
      await router.push({ name: 'login' });
    } catch (error) {
      console.error(error);
    }
  };
  
  const formatDate = (date: string | Date | null) => {
    if (date) {
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth() + 1; // getMonth is zero-indexed
      const day = selectedDate.getDate();
      const year = selectedDate.getFullYear();
      formatedDOB.value = `${day}/${month}/${year}`; // Format as MM/DD/YYYY
    }
  };
  
  // Watch the `dob` and update the `formatedDOB` when the date changes
  watch(dob, (newValue) => {
    formatDate(newValue); // Pass the new value to the formatting function
  });
  
  const encryptPassword = async () => {
    await checkConfirmPassword();
    const saltRounds = 12345;
    return await bcrypt.hash(password.value, saltRounds);
  };
  
  const checkConfirmPassword = () => {
    if (password.value !== confirmPassword.value) {
      alert('Password is not the same');
    }
  };
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
  