<script setup>
import axios from "axios";
let exerciseSearchList = reactive([]);
import {defineComponent, defineProps, reactive, ref} from "vue";
import Player from "src/models/Player";
import Exercise from "src/models/Exercise";
defineProps({
  user: Player
})
async function getData() {
  exerciseSearchList.value = []; //empty search list
      axios.get("https://wger.de/api/v2/exercisebaseinfo?limit=20&language=2")
          .then((response) => {
            let results = response.data.results;
            console.log(results);
            for(let result of results) {
              for(let exercise of result.exercises) {
                exerciseSearchList.value.push(new Exercise(exercise.name, exercise.description.replace(/<[^>]*>/g, ''), 10, Math.floor((Math.random() * 20) + 10), Math.floor((Math.random() * 30) + 20)));
                //.replace() expression removes all html tags from the description, because it otherwise comes with those
              }

            }
            console.log(exerciseSearchList);
          }).catch((error) => {
        console.error(error.message);
      });
}
// export default defineComponent({
//   name: "ExerciseQueryList",
//   components:{},
//   props: {
//     user: Player
//   },
//   methods: {
//     getData: async function () {
//
//
//
//
//     },
//
//   },
//   setup() {
//     return {exerciseSearchList}
//   }
//
// })
</script>

<template>
  <q-btn color="primary" label="Search Exercises" style="margin-bottom: 20px;" @click="getData()"></q-btn>
  <q-virtual-scroll class="list" style="max-height:370px" :items="exerciseSearchList.value" v-slot="{item}"> <!--has to be called {item}, thanks Quasar-->
    <q-item dense>
      <q-item-section>
        <div class="text-h5">{{item.name}}</div>
        <div class="text-h6">Reps per set: {{item.reps}}</div>
        <div class="text-h6">{{item.desc}}</div>
        <div class="text-positive text-h6">Reputation gain: {{item.repGain}} | Gold gain: {{item.goldGain}}</div>
        <q-btn color="white" text-color="black" style="max-width: 150px" @click="user.addExercise(new Exercise(item.name, item.desc, `20`, item.goldGain, item.repGain))">Add to Plan</q-btn>
      </q-item-section>

    </q-item>
  </q-virtual-scroll>

</template>

<style scoped>
.list {
  background-color:black;
}
</style>