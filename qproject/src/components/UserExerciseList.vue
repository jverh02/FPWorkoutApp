<script setup>
import Player from "src/models/Player";

defineProps({
  user: Player,
});

</script>

<template>
  <div class="text-h6">Your Daily Plan</div>
  <q-virtual-scroll style="max-height:370px;margin-top: 20px;" class="list" :items="user.exercises" v-slot="{item}">
    <q-item dense :key="item.uuid">
      <q-item-section>
        <div class="text-h5">{{item.name}}</div>
        <div class="text-h6">Reps per set: {{item.reps}}</div>
        <div class="text-h6">{{item.desc}}</div>
        <div class="text-positive text-h6">Reputation gain: {{item.repGain}} | Gold gain: {{item.goldGain}}</div>
        <q-btn color="white" text-color="black" style="max-width: 50px" @click="user.completeExercise(item)">Done</q-btn>
      </q-item-section>
    </q-item>
  </q-virtual-scroll>
</template>

<style scoped>
.list {
  background-color:black;
}
</style>