module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', process.env.MONGO_DATABASE_HOST),
        srv: env.bool('DATABASE_SRV', true),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', process.env.MONGO_DATABASE_NAME),
        username: env('DATABASE_USERNAME', process.env.MONGO_DATABASE_USERNAME),
        password: env('DATABASE_PASSWORD', process.env.MONGO_DATABASE_PASSWORD),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
