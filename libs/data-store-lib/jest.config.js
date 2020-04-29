module.exports = {
  name: 'data-store-lib',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-store-lib',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
