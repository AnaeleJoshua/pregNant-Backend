module.exports = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    sex: {
      type: 'string'
    }

  },
  required: ['firstName', 'lastName', 'address', 'age'],
  additionalProperties: false
}
