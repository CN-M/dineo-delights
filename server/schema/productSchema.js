const { faker } = require("@faker-js/faker");
const { slugify } = require("slugify");

const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

const Product = require("../models/Product");
const Category = require("../models/Category");
const DealOfTheWeek = require("../models/DealOfTheWeek");
const Order = require("../models/Order");

// Product Type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    imgSrc: { type: new GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    onSale: { type: GraphQLBoolean },
    isNew: { type: GraphQLBoolean },
    stars: { type: GraphQLInt },
    originalPrice: { type: GraphQLInt },
    price: { type: GraphQLInt },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        const { categoryId } = parent;
        return Category.findById(categoryId);
      },
    },
    description: { type: GraphQLString },
  }),
});

// Queries
const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Get All Products
    allProducts: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({});
      },
    },

    // Get Single Product
    singleProduct: {
      type: ProductType,
      args: { slug: { type: GraphQLString } },
      resolve(parents, args) {
        const { slug } = args;
        return Product.findOne({ slug }).populate("category", "name");
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a Product
    // addProduct: {
    //   type: ProductType,
    //   args: {
    //     name: { type: new GraphQLNonNull(GraphQLString) },
    //     imgSrc: { type: new GraphQLNonNull(GraphQLString) },
    //     onSale: { type: new GraphQLNonNull(GraphQLBoolean) },
    //     isNew: { type: new GraphQLNonNull(GraphQLBoolean) },
    //     stars: { type: new GraphQLNonNull(GraphQLInt) },
    //     originalPrice: { type: GraphQLInt },
    //     price: { type: new GraphQLNonNull(GraphQLInt) },
    //     categoryId: { type: new GraphQLNonNull(GraphQLID) },
    //     description: { type: new GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve(parent, args) {
    //     const { icon, name } = args;
    //     return new Product({
    //       icon,
    //       name,
    //       // slug: sluggify,
    //     }).save();
    //   },
    // },

    createProducts: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        const categories = ["Hair", "Shoes", "Electronics", "Food"];
        const products = [];
        for (let i = 1; i <= 10; i++) {
          const name = faker.commerce.productName();
          const imgSrc = faker.image.imageUrl();
          const onSale = randomBoolean();
          const isNew = randomBoolean();
          const stars = randomInt(4, 5);
          const originalPrice = randomInt(20, 550);
          const price = randomInt(4, 450);
          const categoryId = getRandomCategoryId(categories);
          const description = faker.lorem.paragraphs();

          products.push(
            new Product({
              name,
              imgSrc,
              onSale,
              isNew,
              stars,
              originalPrice,
              price,
              categoryId,
              description,
            }).save()
          );
        }
        return Promise.all(products);
      },
    },

    // Remove a Product
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return Product.findByIdAndDelete(id);
      },
    },

    // Update a Product
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        imgSrc: { type: GraphQLString },
        onSale: { type: GraphQLBoolean },
        isNew: { type: GraphQLBoolean },
        stars: { type: GraphQLInt },
        originalPrice: { type: GraphQLInt },
        price: { type: GraphQLInt },
        categoryId: { type: GraphQLID },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        const {
          id,
          name,
          imgSrc,
          onSale,
          isNew,
          stars,
          originalPrice,
          price,
          categoryId,
          description,
        } = args;
        return Product.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              imgSrc,
              onSale,
              isNew,
              stars,
              originalPrice,
              price,
              categoryId,
              description,
            },
          },
          { new: true }
        );
      },
    },
  },
});

function randomBoolean() {
  return Math.random() < 0.5;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCategoryId(categories) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex].id;
}

module.exports = new GraphQLSchema({ query, mutation });
