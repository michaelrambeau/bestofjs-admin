var keystone = require('keystone'),
	Types = keystone.Field.Types;

var options = {
	schema: {
		collection: 'snapshot'
	}
};
var Snapshot = new keystone.List('Snapshot', options);


Snapshot.add({
	stars: { type: Types.Number },
	createdAt: { type: Types.Date },
	project: { type: Types.Relationship, ref: 'Project', many: false }
});

Snapshot.defaultColumns = 'project, createdAt, stars';
Snapshot.register();