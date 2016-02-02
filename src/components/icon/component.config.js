module.exports = {
  // You can define multiple variants
  icon: {
    styles: ['./styles/icon.scss'],
    templates: [
      './templates/icon.html',
      './templates/icon-social.html'
    ],
    assets: [
      {
        src: './images/**',
        dest: 'images'
      },
      {
        src: './fonts/**',
        dest: 'fonts'
      }
    ]
  }
};
