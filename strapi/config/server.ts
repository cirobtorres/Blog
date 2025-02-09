export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"), // IPv4
  // host: env("HOST", "::"), // IPv6
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
