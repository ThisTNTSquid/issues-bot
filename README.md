# Coffee - A Simple Issues Bot

![Coffee](./assets/coffee.png)

Companion for developers to handles suggestions and issues

## Features
- [x] Posting Issues
- [ ] Editing/Replacing Issues
- [ ] Listing posted issues in a guild
- [ ] Resending Issues

## Setup

### Simple "Invite to Server"

This method is recommanded if you wish to use it instantly or don't want to deal with all the trivial setup procedures

Click this link here: https://discordapp.com/oauth2/authorize?client_id=436174065292804106&permissions=519232&scope=bot



### Host it yourself

**Notice: To prevent features breaking due to constant updates in the ALPHA period, please consider testing out the bot by inviting it to your server with the link above instead of hosting it yourself**

#### 1. Clone it
```bash
$ git clone https://github.com/ThisTNTSquid/issues-bot.git
```

#### 2. Register the Bot App
  - Go to the [Discord Developer Console](https://discordapp.com/developers/applications/me)
  - Create a new bot app
  - Make it a bot user
  - Copy the token

#### 3. Setup the config
  - Open [config-template.js](https://github.com/ThisTNTSquid/issues-bot/blob/master/config-template.js) with any editor you like
  - Paste in the bot token into the `token` entry
  - Paste your ID into the `owners` array
  - **Rename `config-tempalte.js` to `config.js`** (This is mandatory, otherwise the bot will not start)

#### 4. Launch it
If you're using NPM (the default package manager that comes along with NodeJS)
```bash
$ npm install
$ npm start
```
If you're using Yarn instead (another package manager, but provide a much faster installation)(recommanded)
```bash
$ yarn
$ yarn start
```