const keystone = require("keystone");
const Types = keystone.Field.Types;

const options = {
  schema: {
    collection: "tags"
  },
  track: true
};
var Tag = new keystone.List("Tag", options);

Tag.add({
  code: { type: Types.Text, required: true, index: true, initial: true },
  name: { type: Types.Text, required: true, index: true, initial: true },
  description: { type: Types.Textarea, required: false },
  comments: { type: Types.Textarea, required: false },
  related: { type: Types.Relationship, ref: "Tag", many: true },
  aliases: { type: Types.TextArray }
});

Tag.defaultColumns = "code, aliases, name, related, description";
Tag.register();
