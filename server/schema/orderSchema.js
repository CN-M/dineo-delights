const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

// Order Type
const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    cost: { type: GraphQLInt },
    nameOfCustomer: { type: GraphQLString },
    items: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        const { productId } = parent;
        return Product.findById(productId);
      },
    },
  }),
});

const ProductInputType = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: () => ({
    id: { type: GraphQLID },
    imgSrc: { type: new GraphQLList(GraphQLString) },
    slug: { type: GraphQLString },
    onSale: { type: GraphQLBoolean },
    isNew: { type: GraphQLBoolean },
    stars: { type: GraphQLInt },
    originalPrice: { type: GraphQLInt },
    price: { type: GraphQLInt },
    categoryId: { type: GraphQLID },
    description: { type: GraphQLString },
  }),
});

// Queries
const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Get All Orders
    allOrders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({});
      },
    },

    // Get Single Order
    singleOrder: {
      type: OrderType,
      args: { slug: { type: GraphQLString } },
      resolve(parents, args) {
        const { slug } = args;
        return Order.findOne({ slug }).populate("product", "name price");
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Create an Order
    createOrder: {
      type: OrderType,
      args: {
        cost: { type: new GraphQLNonNull(GraphQLInt) },
        nameOfCusomer: { type: new GraphQLNonNull(GraphQLString) },
        items: { type: new GraphQLNonNull(new GraphQLList(ProductInputType)) },
      },
      resolve(parent, args) {
        const { cost, nameOfCustomer, items } = args;
        return new Category({
          cost,
          nameOfCustomer,
          items,
          status: "pending",
        }).save();
      },
    },

    // Update Order Status
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { id, status } = args;
        return Order.findByIdAndUpdate(
          id,
          {
            $set: {
              status,
            },
          },
          { new: true }
        );
      },
    },

    // Remove/Cancel an Order
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return Order.findByIdAndDelete(id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query, mutation });
