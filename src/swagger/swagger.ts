import swaggerAutogen from "swagger-autogen";
// import path from 'path';
const swaggerJSDocs = require('swagger-jsdoc')

const swaggerDefinition = {
  info: {
    version: '1.0.0',      // by default: '1.0.0'
    title: 'Rest API',        // by default: 'REST API'
    description: '',  // by default: ''
  },
  host: 'localhost:5050',      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: ['http', 'https'],   // by default: ['http']
  consumes: ["application/json"],  // by default: ['application/json']
  produces: ["application/json"],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: 'Tag 1',         // Tag name
      description: 'Tag 1 Description',  // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {},          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};
const endpointsFiles: string[] = [
  'build/controllers/auth.controller.js',
  'build/controllers/user.controller.js',
]

// const routers = []
// console.log({endpointsFiles})
const options ={
  swaggerDefinition,
  apis: [
    'build/controllers/*.js'
  ]
}
const swaggerSpec = swaggerJSDocs(options)

const outputFile: string = './output_swagger.json'

swaggerAutogen()(outputFile, endpointsFiles, swaggerSpec)