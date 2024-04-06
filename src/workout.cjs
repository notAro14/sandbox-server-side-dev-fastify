class Workout {
  constructor(title) {
    this.title = title;
  }

  toJSON() {
    return {
      title: this.title,
    };
  }
}

module.exports = {
  Workout,
};
