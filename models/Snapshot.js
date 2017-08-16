const keystone = require('keystone')
const Types = keystone.Field.Types

var options = {
  schema: {
    collection: 'snapshot'
  }
}
var Snapshot = new keystone.List('Snapshot', options)

Snapshot.add({
  stars: { type: Types.Number, initial: true },
  createdAt: { type: Types.Datetime, initial: true },
  project: {
    type: Types.Relationship,
    ref: 'Project',
    many: false,
    initial: true
  }
})

Snapshot.defaultColumns = 'project, createdAt, stars'
Snapshot.register()
