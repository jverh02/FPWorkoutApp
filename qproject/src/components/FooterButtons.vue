<script setup>
import {defineComponent, reactive, ref} from "vue";
import Shop from "src/models/Shop";
import Player from "src/models/Player";
import Gear from "src/models/Gear";
import ShopItem from "src/models/ShopItem";
const showFriends = ref(false);
const showShop = ref(false);
const showAddFriend = ref(false);
const nameInput = ref("");
function generateFriend(name) {
  let className = "";
  switch(Math.floor(Math.random() * 2) + 1) {
    case 1:
      className = "Monk";
      break;
    case 2:
        className = "Barbarian";
        break;
    default:
      className = "Unknown";
  }
  return new Player(name, className);
}
let shop = reactive(new Shop()
    .addItem(new ShopItem(new Gear("Chestplate of Shoptesting","Chest","Gold", 3), 300, "Gold"))
    .addItem(new ShopItem(new Gear("Leggings of Legging", "Legs", "Reputation", 2), 400, "Reputation")));
defineProps({
  user: Player,
});

</script>

<template>
  <div class="fixed-bottom-right z-top">
    <q-btn color="primary" label="Friends" @click="showFriends = true"></q-btn>
    <q-btn color="primary" label="Shop" @click="showShop = true" align="right"></q-btn>
  </div>

  <q-dialog v-model="showFriends" position="left">
    <q-card class="bg-primary text-white">
      <q-card-section>
        <div class="row">
          <div class="col">
        <div class="text-h6">Friends</div>
            </div>
          <div class="col">
            <q-btn color="positive" size="11px" @click="showAddFriend = true">Add Friend</q-btn>
          </div>
        </div>
        <q-separator color="white" />
        <div class="text-h6" v-if="(user.getFriends().length === 0)">No friends found. Why not add some?</div>
        <q-virtual-scroll :items="user.getFriends()" v-slot="{item}">
          <q-item :key="item.uuid">
            <q-item-section>

              <div class="text-h6">{{item.info.name}}</div>
              <q-item-label>Class: {{item.info.className}}</q-item-label>
              <q-item-label>Reputation: {{item.info.reputation}} | Gold: {{item.info.gold}}</q-item-label><br>

              <q-btn color="negative" @click="user.removeFriend(item)">Remove Friend</q-btn>
            </q-item-section>


          </q-item>
          <q-separator color="grey" />
        </q-virtual-scroll>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showShop" position="right">

    <q-card class="bg-primary text-white">
      <q-card-section>
        <div class="text-h6">Shop</div>
        <q-separator color="white" />
        <div class="text-h6">Reputation: {{user.reputation}} | Gold: {{user.gold}}</div><br>
        <q-item-label>The shop doesn't work yet, but this button does! Ain't that neat?</q-item-label>
        <q-virtual-scroll :items="shop.getShopItems()" v-slot="{item}">
          <q-item>
            <q-item-section>
              <div class="text-h6">{{item.gear.name}}</div>
              <q-item-label>{{item.cost}} {{item.costType}}</q-item-label>
              <q-btn color="secondary" align="right" style="max-width: 50px" @click="shop.sell(item, user)">Buy</q-btn>
            </q-item-section>


          </q-item>
          <q-separator color="grey" />
        </q-virtual-scroll>
      </q-card-section>
    </q-card>

  </q-dialog>
  <q-dialog v-model="showAddFriend" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Enter Character Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="nameInput" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add Friend" v-close-popup @click="user.addFriend(generateFriend(nameInput))"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>