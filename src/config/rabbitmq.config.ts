export default (): Record<string, unknown> => ({
    rabbitmq: {
      host: process.env.RABBITMQ_HOST ,
      port: process.env.RABBITMQ_PORT ,
    },
})