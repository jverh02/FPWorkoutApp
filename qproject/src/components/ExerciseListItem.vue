<script setup>

</script>

<template>
  <q-item dense>
    <q-item-section>
      <div class="text-h5">{{item.name}}</div>
      <div class="text-h6">Reps per set: {{item.reps}}</div>
      <div class="text-h6">{{item.desc}}</div>
      <div class="text-positive text-h6">Reputation gain: {{item.repGain}} | Gold gain: {{item.goldGain}}</div>
      <q-btn color="white" text-color="black" style="max-width: 50px" @click="user.completeExercise(item)">Done</q-btn>
    </q-item-section>
  </q-item>
</template>

<style scoped>

</style>