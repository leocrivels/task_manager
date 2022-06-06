module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: {type: String, required:true},
          done: {type: Boolean, required:true, default:false},
          end: {type: Date},
          project:{type:mongoose.SchemaTypes.ObjectId, ref:"project"},
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    const Task = mongoose.model("task", schema);
    return Task;
  };