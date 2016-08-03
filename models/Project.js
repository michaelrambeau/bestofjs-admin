var keystone = require('keystone'),
	Types = keystone.Field.Types;

var options = {
  schema: {
  	collection: 'project'
  },
  defaultSort: '-createdAt',
  track: true
};
var Project = new keystone.List('Project', options);


Project.add({
	name: { type: Types.Text, required: true, index: true, initial: true },
	description: { type: Types.Textarea, required: false },
	url: { type: Types.Url, required: false },
	repository: { type: Types.Url, required: true, initial: true },
	
	// used to temporally disable a project from the list, screenshots will still be taken
	disabled: { type: Types.Boolean, default: false }, 
	
	// used to definitevely remove a project: no screenshot will be taken.
	deprecated: { type: Types.Boolean, default: false }, 
	
	tags: { type: Types.Relationship, ref: 'Tag', many: true },
	
	github: {
	  name:  { type: Types.Text },
	  full_name:  { type: Types.Text },
	  description:  { type: Types.Text },
	  homepage:  { type: Types.Text },
	  stargazers_count: { type: Types.Number },
    pushed_at: {type: Types.Date, format: 'YYYY-MM-DD'},
    branch: { type: Types.Text },
    packageJson: { type: Types.Boolean },
    owner_id: Types.Text
	},
	packagequality: {
		quality: { type: Types.Number }
	},
  npms: {
    score: {
      detail: {
        maintenance: Types.Number,
        popularity: Types.Number,
        quality: Types.Number
      },
      final: Types.Number
    }
  },	
	npm: {
	  name: { type: Types.Text, initial: true },
	  version: { type: Types.Text },
	  dependencies: { type: Types.TextArray }
	},
	svglogo: { type: Types.Html, wysiwyg: false },
	logo: { type: Types.CloudinaryImage, folder: 'project-logos', autoCleanup : true },
	colors: {
	  vibrant: { type: Types.Color },
	  muted: { type: Types.Color },
	  darkVibrant: { type: Types.Color }
	},
	snapshots: { type: Types.Relationship, ref: 'Snapshot', many: true }
});

Project.schema.methods.toString = function () {
	return "Project " + this.name + ' ' + this._id;
};

Project.defaultColumns = 'name, npm.name, npms.score.final, packagequality.quality, repository, tags, createdAt';
Project.register();