var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Hero = new keystone.List('Hero');

var options = {
  schema: {
  	collection: 'heroes' // overwrite the default 'heros'!
  },
  defaultSort: '-createdAt',
  track: true, // automatically add `createdAt` and `updatedAt`
  map: {
    name: 'github.login'
  }
};
var Hero = new keystone.List('Hero', options);

Hero.add({
  github: {
    login: { type: Types.Text, required: true, index: true, initial: true },
    name: { type: Types.Name, required: false, index: true },
    avatar_url: { type: Types.Url, required: false }
  }
});

Hero.defaultColumns = 'github.login, github.name, createdAt';
Hero.register();
