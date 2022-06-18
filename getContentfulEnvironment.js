const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-9pSzYBh6vDx5qQNLII6tYuygS7ghXXQNmqyhmIh7FPY",
  });

  return contentfulClient
    .getSpace("e71x74t11w22")
    .then((space) => space.getEnvironment("master"));
};
