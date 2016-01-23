var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var options = {
	schema: {
		collection: 'tag'
	},
	track: true
};
var Tag = new keystone.List('Tag', options);


Tag.add({
	code: { type: Types.Text, required: true, index: true, initial: true },
	name: { type: Types.Text, required: true, index: true, initial: true },
	description: { type: Types.Textarea, required: false },
	createdAt: { type: Types.Date, default: Date.now },
	updatedAt: { type: Types.Date }
});


/**
 * Registration
 */

Tag.defaultColumns = 'code, name, description';
Tag.register();
