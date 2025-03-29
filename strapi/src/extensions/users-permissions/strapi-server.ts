"use strict";

console.log("\n--------------------------------------------------");
console.log("✅ Strapi-Server!");

module.exports = (plugin) => {
  // Mantém uma referência ao callback original
  const originalCallback = plugin.controllers.auth.callback;

  // Substitui apenas o callback
  plugin.controllers.auth.callback = async (ctx) => {
    console.log("\n--------------------------------------------------");
    console.log("🚀 Custom callback executed!");
    console.log("Query params:", ctx.query);
    console.log("State:", ctx.query.state); // Deve conter seu redirect

    try {
      const provider = ctx.params.provider;

      // Extrai o redirect do state (que foi passado via GitHub)
      const state = JSON.parse(decodeURIComponent(ctx.query.state || "{}"));
      const redirectUrl = state.redirect || `${process.env.FRONTEND_URL}/`;

      // Restante do seu código...
      const user = await strapi
        .plugin("users-permissions")
        .service("providers")
        .connect(provider, ctx.query);
      const jwt = strapi
        .plugin("users-permissions")
        .service("jwt")
        .issue({ id: user.id });

      return ctx.redirect(`${redirectUrl}?jwt=${jwt}`);
    } catch (error) {
      console.error("Auth error:", error);
      const state = JSON.parse(decodeURIComponent(ctx.query.state || "{}"));
      const redirectUrl = state.redirect || `${process.env.FRONTEND_URL}/`;
      return ctx.redirect(`${redirectUrl}?error=auth_failed`);
    }
  };

  return plugin;
};
