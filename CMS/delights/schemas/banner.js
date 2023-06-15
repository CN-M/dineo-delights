const banner = {
    title: 'Banner',
    name: 'banner',
    type: 'document',
    fields: [
        {
            title: 'Image',
            name: 'imgSrc',
            type: 'image',
            options: {
              hotspot: true,
            }
        },
        {
            title: 'Banner Title',
            name: 'bannerTitle',
            type: 'string',
        },
        {
            title: 'Banner Subtitle',
            name: 'bannerSubtitle',
            type: 'string',
        },
        {
            title: 'Starting At Price',
            name: 'bannerText',
            type: 'string',
        },
    ],
};

export default banner