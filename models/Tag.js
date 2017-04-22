const keystone = require('keystone')
const Types = keystone.Field.Types

const options = {
  schema: {
    collection: 'tag'
  },
  track: true
}
var Tag = new keystone.List('Tag', options)

Tag.add({
  code: { type: Types.Text, required: true, index: true, initial: true },
  name: { type: Types.Text, required: true, index: true, initial: true },
  description: { type: Types.Textarea, required: false },
  aliases: { type: Types.TextArray }
})

Tag.defaultColumns = 'code, aliases, name, description'
Tag.register()
