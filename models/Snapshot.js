const keystone = require("keystone");
const Types = keystone.Field.Types;

var options = {
  schema: {
    collection: "snapshots"
  }
};
var Snapshot = new keystone.List("Snapshot", options);

Snapshot.add({
  year: { type: Types.Number },
  project: {
    type: Types.Relationship,
    ref: "Project",
    many: false,
    initial: true
  },
  createdAt: { type: Types.Datetime },
  updatedAt: { type: Types.Datetime },
  fullName: { type: Types.Text }
});

Snapshot.defaultColumns = "project, year, fullName, createdAt, updatedAt";
Snapshot.register();
