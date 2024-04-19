const Joi = require('joi');

// Extend Joi's instance to customize its behavior
const ExtendedJoi = Joi.extend((joi) => ({
  type: 'object',
  base: joi.object(),
  messages: {
    'object.unknown': '{{#label}} is not allowed',
  },
  rules: {
    extractErrors: {
      method() {
        return this.$_addRule({ name: 'extractErrors' });
      },
      args: [],
      validate(value, helpers) {
        const { error } = value;
        if (!error || !error.details) return value;
        return error.details.reduce((acc, curr) => {
          acc[curr.context.key] = curr.message;
          return acc;
        }, {});
      },
    },
  },
}));

module.exports = ExtendedJoi;
