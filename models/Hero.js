var keystone = require('keystone'),
	Types = keystone.Field.Types;

var options = {
  schema: {
  	collection: 'heroes' // overwrite the default 'heros'!
  },
  defaultSort: '-createdAt',
  track: true, // automatically add `createdAt` and `updatedAt`
  map: {
    name: 'github.login' // 1st field used in list and document views (to avoid displaying '_id' field) 
  }
  // `autokey` does not work... how to enforce unicity ?
  // autokey: { path: 'github.login', from: 'github.login', unique: true },
};
var Hero = new keystone.List('Hero', options);

Hero.add({
  short_bio: { type: Types.Text },
  github: {
    login: { type: Types.Text, required: true, index: true, initial: true },
    name: { type: Types.Text, index: true },
    avatar_url: { type: Types.Url },
    blog: { type: Types.Url },
    followers: { type: Types.Number },
  },
  projects: { type: Types.Relationship, ref: 'Project', many: true },
  npm: {
    count: { type: Types.Number },
    username: { type: Types.Text }
  }
});

Hero.defaultColumns = 'github.login, github.name, github.followers, npm.username, npm.count, projects, createdAt';
Hero.register();