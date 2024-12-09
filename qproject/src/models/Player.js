import Gear from "src/models/Gear";
import Friend from "src/models/Friend";
import {reactive} from "vue";

export default class Player {
  friends = [];
  exercises = [];
  helmet = null;
  chest = null;
  legs = null
  boots = null;
  goldBonus = 0;
  repBonus = 0;
  uuid = Math.random() * 1e016;
  constructor(name, className) {
    this.name = name;
    this.className = className;
    this.reputation = 200;
    this.gold = 500;
    this.difficulty = "Easy";
    this.addFriend = function(user) {
      this.friends.push(new Friend(user));
    }
    this.removeFriend = function(user) {
      user.uuid = -1;
      this.friends.splice(this.friends.indexOf(user), 1);
      console.log(user);
    }
    this.getFriends = function() {
      return this.friends;
    }
    this.addExercise = function(exercise) {
      this.exercises.push(exercise);
    }
    this.completeExercise = function(exercise) {
      this.removeExercise();
      let gReward = Math.ceil(exercise.goldGain * (1.0 + (this.goldBonus/100.0)));
      //rounding up the bonus is a small thing but the user will prefer it
      this.gold += gReward;
      console.log("Gold reward: " + gReward);
      let rReward =  Math.ceil(exercise.repGain * (1.0 + (this.repBonus/100.0)));
      this.reputation += rReward;
      console.log("Reputation reward: " + rReward);
    }
    this.removeExercise = function(exercise) {
      this.exercises.splice(this.exercises.indexOf(exercise), 1);
    }
    this.addGear = function(gear) {
      switch (gear.type) {
        case "Helmet":
          this.helmet = gear;
          break;
        case "Chest":
          this.chest = gear;
          break;
        case "Legs":
          this.legs = gear;
          break;
        case "Boots":
          this.boots = gear;
          break;
        default:
          console.log("ERROR: " + gear.name + " " + gear.type + " is invalid.");
      }
      this.calculateBonuses();
    }
    this.calculateBonuses = function() {
      this.goldBonus = 0;
      this.repBonus = 0;
      if(this.helmet) {
        switch (this.helmet.bonusType) {
          case "Gold":
            this.goldBonus += this.helmet.bonusAmount;
            break;
          case "Reputation":
            this.repBonus += this.helmet.bonusAmount;
            break;
          default:
            console.log("Error applying helmet bonus");
        }
      }
      if(this.chest) {
        switch (this.chest.bonusType) {
          case "Gold":
            this.goldBonus += this.chest.bonusAmount;
            break;
          case "Reputation":
            this.repBonus += this.chest.bonusAmount;
            break;
          default:
            console.log("Error applying chest bonus");
        }
      }
      if(this.legs) {
        switch (this.legs.bonusType) {
          case "Gold":
            this.goldBonus += this.legs.bonusAmount;
            break;
          case "Reputation":
            this.repBonus += this.legs.bonusAmount;
            break;
          default:
            console.log("Error applying legs bonus");
        }
      }
      if(this.boots) {
        switch (this.boots.bonusType) {
          case "Gold":
            this.goldBonus += this.boots.bonusAmount;
            break;
          case "Reputation":
            this.repBonus += this.boots.bonusAmount;
            break;
          default:
            console.log("Error applying boots bonus");
        }
      }
    }

}
}
