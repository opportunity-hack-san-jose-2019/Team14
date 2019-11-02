var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 8080;
  process.env.MONGODB_URI = 'mongodb+srv://root:root@opportunityhackcluster-w3hia.mongodb.net/test?retryWrites=true&w=majority';
}