var Boom = require('boom'),
  Qs = require('qs'),
  Joi = require('joi');

var helloCtlr = require('./hello-controller');

module.exports = {
  method: 'GET',
  path: '/hello/{id}',
  config: {
    description: 'gets an hello greeting',
    notes: 'gets an hello greeting',
    tags: ['api'],
    validate: {
      query: {
        person: Joi.object().optional().description('adicional params').keys({
          firstName: Joi.string().optional(),
          lastName: Joi.string().optional()
        })
      },
      params: {
        id: Joi.number().required().description('id')
      }
    },
    handler: function(request, reply) {
      var queryString = Qs.parse(request.query);
      helloCtlr.run(queryString, encodeURIComponent(request.params.id))
        .then(function(data) {
          reply(data);
        }, function(err) {
          console.error(err);
          var error = Boom.badRequest(err);
          error.output.statusCode = 404;
          error.reformat();
          return reply(error);
        });
    }
  }
};
