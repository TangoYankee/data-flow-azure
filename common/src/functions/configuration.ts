import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";
import { psqlTemplatePath } from "../utils/ constants";

export async function configuration(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const postgisExtensionPromise = $({ env: { SQL_FILE: "src/scripts/configuration/postgis_extension.sql" } })(psqlTemplatePath);
  const spacesAliasPromise = $("src/scripts/configuration/spaces_alias.sh");
  await Promise.all([postgisExtensionPromise, spacesAliasPromise]);

  return { body: "configurations complete\n" };
};

app.http('configuration', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: configuration
});
