

<script>
import Player from "src/models/Player";
import Exercise from "src/models/Exercise";
import Gear from "src/models/Gear";
import {ref, defineComponent, reactive} from "vue";
import PlayerInfo from "components/PlayerInfo.vue";
import ExerciseQueryList from "components/ExerciseQueryList.vue";
import FooterButtons from "components/FooterButtons.vue";
import UserExerciseList from "components/UserExerciseList.vue";
let testUser = reactive( new Player("Character McDefault", "Barbarian"));

export default defineComponent({
  name: "UserDisplay",
  components: {UserExerciseList, FooterButtons, ExerciseQueryList, PlayerInfo},
  emits: ['update'],
  methods: {

    // updateComponent() {
    //   console.log("updating ", this);
    //   this.$forceUpdate();
    // }
  },
  props: {
    currentTab:String,
  },
  setup() {

    testUser.addFriend(new Player("Monk E.", "Monk"));
    testUser.addFriend(new Player("Barbara", "Barbarian"));
    testUser.addExercise(new Exercise("Push-Up", "Start in plank position, lower your chest to the ground, bend your elbows, then push back up, keeping your body straight.", 15, Math.floor((Math.random() * 20) + 10), Math.floor((Math.random() * 20) + 10)));
    testUser.addExercise(new Exercise("Dumbbell Curl", "Hold dumbells with palms-up, curl weights toward body, then lower them.", 12, Math.floor((Math.random() * 20) + 10), Math.floor((Math.random() * 20) + 10)));
    testUser.addGear(new Gear("Beautiful Helmet of Helmeting", "Helmet","Reputation",5));
    // const currentTab = ref('home'); // hold the current tab: home, plan

    return { testUser};
  },
  data: function () {
    return {
    }
  }
})
</script>
<template>

  <q-page class="main">
    <!--    <q-drawer side="left" overlay bordered></q-drawer>-->
    <q-tab-panels v-model="this.currentTab" style="height:80vh">
      <q-tab-panel name="home">
<div class="bg">
  <br><q-img src="../assets/dude.gif" class="dude" width="400px"></q-img></div>

        <player-info class="info" :user="testUser"></player-info>
      </q-tab-panel>
      <q-tab-panel name="plan" class="bg-dark text-white plan">
        <div class="text-h5" align="center" style="margin-bottom:20px">Workout Plan: {{testUser.name}} the {{testUser.className}}
          <q-select bg-color="white" align="center" dense style="max-width:200px" :options="['Barbarian', 'Monk']" v-model="testUser.className">
            <!--          <option value="Barbarian">Barbarian</option>-->
            <!--          <option value="Monk">Monk</option>-->
          </q-select></div>

        <div class="row">
          <div class="col">
            <div id="queryresults"></div>
            <exercise-query-list :user="testUser"></exercise-query-list>
          </div>
          <div class="col">
            <user-exercise-list :user="testUser"></user-exercise-list>
          </div>
        </div>
        <player-info class="info" :user="testUser"></player-info>
      </q-tab-panel>
    </q-tab-panels>
    <footer-buttons :user="testUser"></footer-buttons>
  </q-page>
</template>

<style scoped>

.bg {
  background-image: url('src/assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height:80%;
  position:absolute;
  top:0px;
  left:0px;

}
.dude {
  position: relative;
  top:22vh;
  left:15%;
}
.info {
  color:#000;
}
* {
  padding: 0;
  margin: 0;

}


</style>
