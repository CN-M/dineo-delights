const category = {
    title: 'Category',
    name: 'category',
    type: 'document',
    fields: [
        {
            title: 'Category Icon',
            name: 'imgSrc',
            type: 'image',
            options: {
              hotspot: true,
            }
        },
        {
            title: 'Category Name',
            name: 'categoryName',
            type: 'string',
        },
        { 
            name: 'categorySlug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'categoryName',
              maxLength: 90,
            }
          },
    ],
};

export default category