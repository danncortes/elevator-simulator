module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": "airbnb-base",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "modules": true,
    },
    "sourceType": "module"
  },
  "plugins": [
    "jest"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
  },
  "parser": "babel-eslint",
};