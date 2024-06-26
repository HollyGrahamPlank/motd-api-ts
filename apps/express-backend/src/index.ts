import runApp from "./app";
import { API_SPEC_PATH } from "./config/apiValidator.config.js";
import { AUTH0_DOMAIN } from "./config/auth0.config";
import { HTTP_PORT } from "./config/http.config.js";
import { MONGODB_URL } from "./config/mongoDb.config.js";

// Actually run the application
runApp({
  httpPort: HTTP_PORT,
  mongoDbUrl: MONGODB_URL,
  apiSpecPath: API_SPEC_PATH,
  auth0Domain: AUTH0_DOMAIN,
  populateDb: true,
});
