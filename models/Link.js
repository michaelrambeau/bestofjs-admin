var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Link = new keystone.List('Link');

Link.add({
	projects: { type: Types.Relationship, ref: 'Project', many: true, required: true, initial: true },
	title: { type: Types.Text },
	url: { type: Types.Url },
	comment: { type: Types.Markdown },
	createdBy: { type: Types.Text, required: true, initial: true },
	createdAt: { type: Types.Date, default: new Date() },
	updatedAt: { type: Types.Date }
});

Link.defaultColumns = 'projects, title, createdBy, createdAt';
Link.register();