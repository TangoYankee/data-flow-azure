import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";
import { flowPsqlPgConnection, baseScriptsPath } from "../utils/ constants";

const configurationScriptsPath = `${baseScriptsPath}/configurations`
export async function configurations(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const postgisExtensionPromise = $({ env: { PG_CONNECTION: flowPsqlPgConnection, SCRIPTS_PATH: configurationScriptsPath } })(`${configurationScriptsPath}/create_postgis.sh`);
  const spacesAliasPromise = $(`${configurationScriptsPath}/alias_spaces.sh`);
  await Promise.all([postgisExtensionPromise, spacesAliasPromise]);

  return { body: "configurations complete\n" };
};

app.http('configurations', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: configurations
});
