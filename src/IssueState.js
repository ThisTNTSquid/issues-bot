tags = ["[Open]", "[Closed]"];
module.exports = {
  OPEN: 0,
  CLOSED: 1,
  getTag(state) {
    return tags[state];
  }
};
