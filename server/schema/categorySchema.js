const { slugify } = require("slugify");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const Product = require("../models/Product");
const Category = require("../models/Category");

// Category Type
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
});

// Queries
const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Get All Categories
    allCategories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      },
    },

    // Get Single Category Products
    singleCategory: {
      type: CategoryType,
      args: { slug: { type: GraphQLString } },
      resolve(parents, args) {
        const { slug } = args;
        const category = Category.findOne({ slug });
        return Product.find({ category: category.id }).populate(
          "category",
          "name icon"
        );
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a Category
    addCategory: {
      type: CategoryType,
      args: {
        icon: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { icon, name } = args;
        return new Category({
          icon,
          name,
          slug: slugify(name),
        }).save();
      },
    },

    // Remove a Category & All Their Products
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        Product.find({ categoryId: id }).then((products) => {
          products.forEach((product) => product.remove());
        });

        return Category.findByIdAndDelete(id);
      },
    },

    // Update a Category
    updateCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        icon: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        const { id, name, icon } = args;
        return Category.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              icon,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query, mutation });
