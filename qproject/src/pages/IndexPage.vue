
<template>


<!--    <p>Test</p>-->
<!--    <img-->
<!--      alt="Quasar logo"-->
<!--      src="~assets/quasar-logo-vertical.svg"-->
<!--      style="width: 200px; height: 200px"-->
<!--    >-->

<user-display :current-tab="currentTab"></user-display>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import UserDisplay from "components/UserDisplay.vue";
defineProps({
  currentTab: String
})
</script>
