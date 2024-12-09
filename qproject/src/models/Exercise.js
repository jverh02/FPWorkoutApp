export default class Exercise {
  uuid = Math.random() * 1e16;
  repGain = 20;
  goldGain = 30;
  constructor(name, desc, reps, goldGain, repGain) {
    this.name = name;
    this.desc = desc;
    this.reps = reps;
    this.goldGain = goldGain;
    this.repGain = repGain;
  }
}
