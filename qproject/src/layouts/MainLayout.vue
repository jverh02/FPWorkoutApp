<script>
import { ref } from 'vue';
import currentTab from "components/UserDisplay.vue";
export default {
  setup () {
    const currentTab = ref('home')
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    //const currentTab = ref('home'); // hold the current tab: home, plan
    return {
      currentTab,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>
<template>
  <q-layout view="hhh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
<!--        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />-->

        <q-toolbar-title align="center">
          <q-avatar>
            <i class="bi bi-lungs-fill"></i>
          </q-avatar>Warrior Workout
          <q-tabs class="bg-primary text-white tabs" v-model="currentTab">
            <q-tab name="home" label="Home" align="center" style="padding-right:5px;"/>
            <q-tab name="plan" label="Workout Plan" style="padding-left:5px;"/>
          </q-tabs>
        </q-toolbar-title>

<!--        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />-->
      </q-toolbar>

    </q-header>

<!--    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>-->
<!--      &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

<!--    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>-->
<!--      &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

    <q-page-container>
      <router-view :current-tab="currentTab" />
    </q-page-container>

  </q-layout>
</template>


<style>
* {
  max-height:100vh;
}
</style>
