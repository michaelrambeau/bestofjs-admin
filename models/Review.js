var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Review = new keystone.List('Review');

Review.add({
	project: { type: Types.Relationship, ref: 'Project', many: false, required: true, initial: true },
	rating: { type: Types.Number, required: true, initial: true },
	comment: { type: Types.Markdown },
	createdBy: { type: Types.Text, required: true, initial: true },
	createdAt: { type: Types.Date, default: new Date() },
	updatedAt: { type: Types.Date }
});

Review.defaultColumns = 'project, rating, createdBy, createdAt';
Review.register();