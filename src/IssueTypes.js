types = [
  {
    name: "Suggestion",
    image:
      "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/134/thought-balloon_1f4ad.png",
      settings_name: 'suggest_channel'
  },
  {
    name: "Issue",
    image:
      "https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/134/warning-sign_26a0.png",
    settings_name: 'issue_channel'
  }
];
module.exports = {
  SUGGESTION: 0,
  ISSUE: 1,
  getDetail(type) {
    return types[type]
  }
};
