const keystone = require("keystone");
const Types = keystone.Field.Types;

const options = {
  schema: {
    collection: "projects"
  },
  defaultSort: "-createdAt",
  track: true
};
const Project = new keystone.List("Project", options);

Project.add({
  name: { type: Types.Text, required: true, index: true, initial: true },
  description: { type: Types.Textarea, required: false },
  // used to override the description provided by GitHub (to filter descriptions that contain UEL)
  override_description: { type: Types.Boolean, default: false },
  url: { type: Types.Url, required: false },
  // used to override the GitHub homepage URLs (like shortened URLs to npm packages or GitHub repos, or URL that advertise products)
  override_url: { type: Types.Boolean, default: false },

  repository: { type: Types.Url, required: true, initial: true, unique: true },

  // used to temporally disable a project from the list, screenshots will still be taken
  disabled: { type: Types.Boolean, default: false },

  // used to definitively remove a project: no screenshot will be taken.
  deprecated: { type: Types.Boolean, default: false },

  tags: { type: Types.Relationship, ref: "Tag", many: true },

  github: {
    name: { type: Types.Text },
    full_name: { type: Types.Text, unique: true },
    description: { type: Types.Text },
    homepage: { type: Types.Text },
    stargazers_count: { type: Types.Number },
    pushed_at: { type: Types.Date, format: "YYYY-MM-DD" },
    branch: { type: Types.Text },
    packageJson: { type: Types.Boolean },
    owner_id: Types.Text,
    topics: Types.TextArray,
    commit_count: Types.Number,
    contributor_count: Types.Number,
    created_at: { type: Types.Date },
    archived: { type: Types.Boolean },
    last_commit: { type: Types.Date, format: "YYYY-MM-DD" }
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
    dependencies: { type: Types.TextArray },
    deprecated: { type: Types.Boolean, default: false }
  },
  bundle: {
    name: { type: Types.Text },
    dependencyCount: { type: Types.Number },
    gzip: { type: Types.Number },
    size: { type: Types.Number },
    version: { type: Types.Text },
    errorMessage: { type: Types.Text },
    updatedAt: { type: Types.Date }
  },
  icon: {
    url: { type: Types.Text },
    inlineSvg: { type: Types.Html, wysiwyg: false }
  },
  logo: {
    type: Types.CloudinaryImage,
    folder: "project-logos",
    autoCleanup: true
  },
  colors: {
    vibrant: { type: Types.Color },
    muted: { type: Types.Color },
    darkVibrant: { type: Types.Color }
  },
  twitter: { type: Types.Text },
  comments: { type: Types.Textarea },
  aliases: { type: Types.TextArray }
});

Project.schema.methods.toString = function() {
  return "Project " + this.name + " " + this._id;
};

Project.schema.methods.setGitHubFullName = function() {
  const fullName = extractGitHubFullName(this.repository);
  if (!fullName)
    throw new Error(`Unable to parse the repository URL to ${this.repository}`);
  this.github.full_name = fullName;
};

Project.schema.pre("save", function(next) {
  const isGitHubRepositoryURL = url => url.startsWith("https://github.com/");

  if (!isGitHubRepositoryURL(this.repository)) {
    throw new Error(`The "repository" should be a GitHub URL!`);
  }

  if (!this.github.full_name) this.setGitHubFullName();

  next();
});

Project.defaultColumns = [
  "name",
  "npm.name",
  "disabled",
  "deprecated",
  "github.last_commit",
  "tags",
  "createdAt"
];

Project.register();

function extractGitHubFullName(url) {
  const re = new RegExp(
    "https://github.com/([a-zA-Z0-9._-]+)/([a-zA-Z0-9._-]+)"
  );
  const parts = re.exec(url);
  if (!parts) return "";
  if (parts.length < 3) return "";
  const owner = parts[1];
  const name = parts[2];
  return `${owner}/${name}`;
}
