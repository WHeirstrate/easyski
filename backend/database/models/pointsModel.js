const MODEL = require("objection").Model;

class Point extends MODEL {
  static get tableName() {
    return "points";
  }

  static get relationMappings() {
    return {
      children: {
        relation: MODEL.ManyToManyRelation,
        modelClass: Point,
        join: {
          from: "persons.id",
          to: "persons.parentId",
        },
      },
    };
  }
}

module.exports = Point;
