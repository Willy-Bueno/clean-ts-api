export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://teste:8545@cluster0.n4qeg.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: 'Uq728ojKpEmOvGOXcOJXeFmV+juAa8xXNu5ePbiLQTg='
}
