/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const { slugify } = require('slugify');

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
} = require('graphql');

const Product = require('../models/Product');
const Category = require('../models/Category');
const DealOfTheWeek = require('../models/DealOfTheWeek');
const Order = require('../models/Order');

// Category Type
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
});

// Product Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
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

// DealOfTheWeek Type
const DealOfTheWeekType = new GraphQLObjectType({
  name: 'DealOfTheWeek',
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

// Order Type
const OrderType = new GraphQLObjectType({
  name: 'Order',
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
  name: 'ProductInput',
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
  name: 'Query',
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
        return Product.find({ category: category.id })
          .populate('category', 'name icon');
      },
    },

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
        return Product.findOne({ slug })
          .populate('category', 'name');
      },
    },

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
        return Order.findOne({ slug })
          .populate('product', 'name price');
      },
    },

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

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
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
          // slug: slugify(name),
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
          { new: true },
        );
      },
    },

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
        const categories = ['Hair', 'Shoes', 'Electronics', 'Food'];
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
            }).save(),
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
          { new: true },
        );
      },
    },

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
          status: 'pending',
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
          { new: true },
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
          { new: true },
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
