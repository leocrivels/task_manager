module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: {type: String, required:true},
          user:{type:mongoose.SchemaTypes.ObjectId, ref:"user"},
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    const Project = mongoose.model("project", schema);
    return Project;
  };