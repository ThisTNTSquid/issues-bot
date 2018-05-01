types = [
  {
    name: "Suggestion",
    image:
      "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/134/thought-balloon_1f4ad.png"
  },
  {
    name: "Problem",
    image:
      "https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/134/warning-sign_26a0.png"
  }
];
module.exports = {
  SUGGESTION: 0,
  PROBLEM: 1,
  getDetail(type) {
    return types[type]
  }
};
