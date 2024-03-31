const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const Product = require("../models/Product");
const DealOfTheWeek = require("../models/DealOfTheWeek");

// DealOfTheWeek Type
const DealOfTheWeekType = new GraphQLObjectType({
  name: "DealOfTheWeek",
  fields: () => ({
    id: { type: GraphQLID },
    // AAdd Date Time Type
    deadline: { type: GraphQLString },
    deal: {
      type: ProductType,
      resolve(parent, args) {
        const { productId } = parent;
        return Product.findById(productId);
      },
    },
  }),
});

const dealOfTheWeek = {
  type: DealOfTheWeekType,
  args: { id: { type: GraphQLID } },
  resolve(parents, args) {
    const { id } = args;
    return DealOfTheWeek.findById(id);
  },
};

// Queries
const dealOfTheWeekQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Get Deal of the Week
    dealOfTheWeek: {
      type: DealOfTheWeekType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        const { id } = args;
        return DealOfTheWeek.findById(id);
      },
    },
  },
});

exports.addDealOfTheWeek = {
  type: DealOfTheWeekType,
  args: {
    deadline: { type: new GraphQLNonNull(GraphQLString) },
    productId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    const { deadline, productId } = args;
    return new DealOfTheWeek({
      deadline,
      productId,
    }).save();
  },
};

// Mutations
const dealOfTheWeekMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add DealOfTheWeek
    addDealOfTheWeek: {
      type: DealOfTheWeekType,
      args: {
        deadline: { type: new GraphQLNonNull(GraphQLString) },
        productId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { deadline, productId } = args;
        return new DealOfTheWeek({
          deadline,
          productId,
        }).save();
      },
    },

    // Update DealOfTheWeek
    updateDealOfTheWeek: {
      type: DealOfTheWeekType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        deadline: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { id, deadline } = args;
        return DealOfTheWeek.findByIdAndUpdate(
          id,
          {
            $set: {
              deadline,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  dealOfTheWeekQuery,
  dealOfTheWeekMutation,
});

module.exports = { dealOfTheWeek };
