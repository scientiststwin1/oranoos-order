export default (): Record<string, unknown> => ({
    mongo: {
      host: process.env.MONGO_HOST ,
      port: process.env.MONGO_PORT ,
      name: process.env.MONGO_DB ,
    },
})