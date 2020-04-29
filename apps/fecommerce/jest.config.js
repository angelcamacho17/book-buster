module.exports = {
  name: 'fecommerce',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fecommerce',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
