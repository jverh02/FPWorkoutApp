import Gear from "src/models/Gear";

export default class Player {
  friends = [];
  exercises = [];
  helmet = null;
  chest = null
  legs = null
  boots = null;
  constructor(name, className) {
    this.name = name;
    this.className = className;
    this.reputation = 200;
    this.gold = 500;
    this.difficulty = "Easy";
    this.addFriend = function(user) {
      this.friends.push(user);
    }
    this.removeFriend = function(user) {
      this.friends.splice(this.friends.indexOf(user), 1);
    }
    this.addExercise = function(exercise) {
      this.exercises.push(exercise);
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
    }

}
}
