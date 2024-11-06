// jest.config.js
export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Add the following line:
  transformIgnorePatterns: [
    '/node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)',
  ],
  testEnvironment: 'node',
};
