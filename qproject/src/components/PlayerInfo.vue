<script setup>
import Player from "src/models/Player";
import {computed} from "vue";
defineProps({
  user: Player,
});

</script>

<template>
<!--  <div class="bg-orange-1 full-width fixed-bottom q-py-sm">-->
  <div class="full-width q-py-sm bg-image fixed-bottom inset-shadow">
    <div class="text-h5" align="center">
      {{user.name}}
    </div>
    <div class="text-h6" align="center">{{user.className}}</div>
    <div class="text-h6" align="center">Gold: {{user.gold}}</div>
    <div class="text-h6" align="center">Reputation: {{user.reputation}}</div>
    <q-separator color="black"></q-separator>
    <div class="text-h5" align="center">Gear</div>
    <div class="text-h5" align="center">({{user.goldBonus}}% gold bonus, {{user.repBonus}}% reputation bonus)</div>
    <div class="text-h6" align="center" v-if="user.helmet">
      {{user.helmet.name}} (+{{user.helmet.bonusAmount}}% {{user.helmet.bonusType}})
    </div>
    <div class="text-h6" align="center" v-else>
      No Helmet
    </div>
    <div class="text-h6" align="center" v-if="user.chest">
      {{user.chest.name}} (+{{user.chest.bonusAmount}}% {{user.chest.bonusType}})
    </div>
    <div class="text-h6" align="center" v-else>
      No Chestpiece
    </div>
    <div class="text-h6" align="center" v-if="user.legs">
      {{user.legs.name}} (+{{user.legs.bonusAmount}}% {{user.legs.bonusType}})
    </div>
    <div class="text-h6" align="center" v-else>
      No Leggings
    </div>
    <div class="text-h6" align="center" v-if="user.boots">
      {{user.boots.name}} (+{{user.boots.bonusAmount}}% {{user.boots.bonusType}})
    </div>
    <div class="text-h6" align="center" v-else>
      No Boots
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: url('src/assets/download.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>