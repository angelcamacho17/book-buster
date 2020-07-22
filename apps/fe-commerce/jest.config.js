module.exports = {
  name: 'fe-commerce',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fe-commerce',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
