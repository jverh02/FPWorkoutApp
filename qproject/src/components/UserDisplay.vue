

<script>
import Player from "src/models/Player";
import Exercise from "src/models/Exercise";
import Gear from "src/models/Gear";
import {ref, defineComponent, reactive} from "vue";
import axios from 'axios';
let testUser = reactive( new Player("Character McDefault", "Barbarian"));
let exerciseSearchList = ref([]);
export default defineComponent({
  name: "UserDisplay",
  components: {},
  emits: ['update'],
  methods: {
    getData: async function () {

      exerciseSearchList.value = []; //empty search list
      axios.get("https://wger.de/api/v2/exercisebaseinfo?limit=20&language=2")
        .then((response) => {
          let results = response.data.results;
          console.log(results);
          for(let result of results) {
            //console.log(result.exercises);
            for(let exercise of result.exercises) {
              // queryresults.innerHTML += exercise.name + ' <q-btn color="white" text-color="black"">Add To Plan</q-btn> ' + ' <q-separator color="grey" style="height: 1px"/>';
              exerciseSearchList.value.push(exercise.name);
            }

          }
          console.log(exerciseSearchList);
        }).catch((error) => {
        console.error(error.message);
      });

      // for(let item of items) {
      //   document.getElementById('queryresults').innerHTML += item + ' <q-separator color="grey" />';
      // }

    },
    completeExercise(exercise) {
      testUser.removeExercise(exercise);
      testUser.reputation += exercise.repGain;
      testUser.gold += exercise.goldGain;
  },
    updateComponent() {
      console.log("updating ", this);
      this.$forceUpdate();
    }
  },
  setup() {

    testUser.addFriend(new Player("Monk E.", "Monk"));
    testUser.addFriend(new Player("Barbara", "Barbarian"));
    testUser.addExercise(new Exercise("Push-Up", "Start in plank position, lower your chest to the ground, bend your elbows, then push back up, keeping your body straight.", 15));
    testUser.addExercise(new Exercise("Dumbbell Curl", "Hold dumbells with palms-up, curl weights toward body, then lower them.", 12));
    testUser.addGear(new Gear("Beautiful Helmet of Helmeting", "Helmet","Reputation","5"));
    const currentTab = ref('home'); // hold the current tab: home, plan
    const showFriends = ref(false); // move this to own component later
    const showShop = ref(false);
    return { testUser, currentTab, showFriends, showShop, exerciseSearchList};
  },
  data: function () {
    return {

    }
  }
})
</script>
<template class="no-scroll">
  <q-tabs align="center" class="bg-primary text-white" v-model="currentTab">
    <q-tab name="home" label="Home" />
    <q-tab name="plan" label="Workout Plan" />
  </q-tabs>
  <q-page class="full-width no-scroll">
    <!--    <q-drawer side="left" overlay bordered></q-drawer>-->
    <q-tab-panels v-model="currentTab" animated class="full-width">
      <q-tab-panel name="home">
        <div class="text-h6 bg-grey-6 full-width" style="height: 650px" align="center">Pretend there's a really neat graphic showing the character in an open field or something.</div>
        <div class="bg-orange-1 full-width fixed-bottom q-py-sm">
          <div class="text-h5" align="center">
            {{testUser.name}}
          </div>
          <div class="text-h6" align="center">{{testUser.className}}</div>
          <div class="text-h6" align="center">Gold: {{testUser.gold}}</div>
          <div class="text-h6" align="center">Reputation: {{testUser.reputation}}</div>
          <q-separator color="black"></q-separator>
          <div class="text-h5" align="center">Gear</div>
          <div class="text-h6" align="center" v-if="testUser.helmet">
            {{testUser.helmet.name}} (+{{testUser.helmet.bonusAmount}}% {{testUser.helmet.bonusType}})
          </div>
          <div class="text-h6" align="center" v-else>
            No Helmet
          </div>
          <div class="text-h6" align="center" v-if="testUser.chest">
            {{testUser.chest.name}} (+{{testUser.chest.bonusAmount}}% {{testUser.chest.bonusType}})
          </div>
          <div class="text-h6" align="center" v-else>
            No Chestpiece
          </div>
          <div class="text-h6" align="center" v-if="testUser.legs">
            {{testUser.legs.name}} (+{{testUser.legs.bonusAmount}}% {{testUser.legs.bonusType}})
          </div>
          <div class="text-h6" align="center" v-else>
            No Leggings
          </div>
          <div class="text-h6" align="center" v-if="testUser.boots">
            {{testUser.boots.name}} (+{{testUser.boots.bonusAmount}}% {{testUser.boots.bonusType}})
          </div>
          <div class="text-h6" align="center" v-else>
            No Boots
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="plan" class="bg-dark text-white" height-hint="98">
        <div class="text-h5" align="center">Workout Plan: {{testUser.name}} the {{testUser.className}}
          <q-select bg-color="white" align="center" dense style="max-width:200px" :options="['Barbarian', 'Monk']" v-model="testUser.className">
            <!--          <option value="Barbarian">Barbarian</option>-->
            <!--          <option value="Monk">Monk</option>-->
          </q-select></div>

        <div class="row">
          <div class="col">
            <div id="queryresults"></div>
              <q-virtual-scroll :items ="exerciseSearchList" v-slot="{item}"> <!--has to be called {item}, thanks Quasar-->
                <q-item dense>
                  <q-item-section>
                  <q-item-label>{{item}}</q-item-label>
                    </q-item-section>

                </q-item>
              </q-virtual-scroll>
            <q-btn color="primary" label="Search Exercises" @click="getData()"></q-btn>


          </div>
          <div class="col">
            <div class="text-h6">Your Daily Plan</div>
            <q-virtual-scroll :items="testUser.exercises" v-slot="{item}" :key="testUser.exercises">
              <q-item dense>
                <q-item-section>
                  <div class="text-h5">{{item.name}}</div>
                  <div class="text-h6">Reps per set: {{item.reps}}</div>
                  <div class="text-h6">{{item.desc}}</div>
                  <div class="text-positive text-h6">Reputation gain: {{item.repGain}} | Gold gain: {{item.goldGain}}</div>
                  <q-btn color="white" text-color="black" style="max-width: 50px" @click="completeExercise(item)">Done</q-btn>
                </q-item-section>
              </q-item>
            </q-virtual-scroll>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <div class="fixed-bottom-right z-top">
      <q-btn color="primary" label="Friends" @click="showFriends = true"></q-btn>
      <q-btn color="primary" label="Shop" @click="showShop = true" align="right"></q-btn>
    </div>

    <q-dialog v-model="showFriends" position="left">
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="text-h6">Friends</div>
          <q-separator color="white" />
          <div class="text-h6" v-if="(testUser.friends.length == 0)">No friends found. Why not add some?</div>
          <q-virtual-scroll :items="testUser.friends" v-slot="{item}" @update="updateComponent()">
            <q-item :key="item.uuid">
              <q-item-section>

                <div class="text-h6">{{item.info.name}}</div>
                <q-item-label>Class: {{item.info.className}}</q-item-label>
                <q-item-label>Reputation: {{item.info.reputation}} | Gold: {{item.info.gold}}</q-item-label><br>
<!--                <q-btn color="negative" @click="() => {-->
<!--                  testUser.removeFriend(item);-->
<!--updateComponent()-->
<!--                }">Remove Friend</q-btn>-->
                <q-btn color="negative" @click="testUser.removeFriend(item)">Remove Friend</q-btn>
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
          <q-item-label>The shop doesn't work yet, but this button does! Ain't that neat?</q-item-label>
          <q-item-label>Reputation: {{testUser.reputation}} | Gold: {{testUser.gold}}</q-item-label><br>

        </q-card-section>
      </q-card>

    </q-dialog>
  </q-page>
</template>

<style scoped>

</style>
