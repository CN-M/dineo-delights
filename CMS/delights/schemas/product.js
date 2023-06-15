const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'imgSrc',
        title: 'Product Images',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      },
      { 
        name: 'name',
        title: 'Product Name',
        type: 'string',
      },
      { 
        title: 'Category Name',
        name: 'category',
        // type: 'reference',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              { type: 'category' }
            ]
          }
        ],
        // to: [ { type: 'category' } ]
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      },
      {
        title: 'Sale?',
        name: 'sale',
        type: 'boolean'
      },
      {
        title: 'New?',
        name: 'isNew',
        type: 'boolean'
      },
      { 
        name: 'stars',
        title: 'Rating out of 5 stars',
        type: 'number',
      },
      { 
        name: 'ogPrice',
        title: 'Origanl Price',
        type: 'number',
        hidden: ({document}) => !document?.sale
      },
      { 
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      { 
        name: 'description',
        title: 'Description',
        type: 'text',
      }
    ]
  }

export default product