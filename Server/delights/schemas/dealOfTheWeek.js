const dealOfTheWeek = {
    name: 'dealOfTheWeek',
    title: 'Deal Of The Week',
    type: 'document',
    fields: [
      {
        title: 'Document Heading',
        name: 'name',
        type: 'string',
        initialValue: 'Deal of the Week'
      },
      { 
        name: 'deal',
        title: 'Deal of the Week',
        type: 'reference',
        to: [{ type: 'product' }]
      },
      { 
        title: 'Deadline',
        name: 'deadLine',
        type: 'datetime',
      },
    ]
  }

// const dealOfTheWeek = {
//     name: 'dealOfTheWeek',
//     title: 'Deal Of The Week',
//     type: 'document',
//     fields: [
//       { 
//         title: 'Category Name',
//         name: 'category',
//         type: 'reference',
//         to: [ { type: 'category' } ]
//       },
//     ]
//   }

export default dealOfTheWeek

// {
//   name: 'imgSrc',
//   title: 'Image',
//   type: 'image',
//   options: {
//     hotspot: true,
//   }
// },
// { 
//   name: 'name',
//   title: 'Product Name',
//   type: 'string',
// },
// { 
//   name: 'category',
//   title: 'Category Name',
//   type: 'string',
// },
// { 
//   name: 'slug',
//   title: 'Slug',
//   type: 'slug',
//   options: {
//     source: 'name',
//     maxLength: 90,
//   }
// },
// {
//   name: 'sale',
//   type: 'boolean'
// },
// { 
//   name: 'OgPrice',
//   title: 'Origanl Price',
//   type: 'number',
// },
// { 
//   name: 'price',
//   title: 'Price',
//   type: 'number',
// },
// { 
//   name: 'description',
//   title: 'Description',
//   type: 'text',
// }