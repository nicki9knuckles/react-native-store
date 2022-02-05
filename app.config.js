import 'dotenv/config'

export default ({ config }) => {
  const appConfig = {
    ...config,
    extra: {
      SERVER_URL: process.env.SERVER_URL,
    },
  }
  return appConfig
}
