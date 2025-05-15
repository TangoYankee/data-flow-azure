import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";
import { DomainTree } from "../utils/types";
import { buildOptionsSchema } from "../utils/zod-schemas";
import { baseScriptsPath, flowOgrPgConnection, flowPsqlPgConnection } from "../utils/ constants";

const boroughDomainTree: DomainTree = {
  boroughs: {
    dependencies: [],
    dependents: [],
  }
}

const boroughScriptsPath = `${baseScriptsPath}/boroughs`;
const artifactSubPath = "sources";

export async function boroughs(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("boroughDomainTree", boroughDomainTree);

  const buildOptions = buildOptionsSchema.parse(await request.json());
  if (buildOptions.skipDownloads !== true) {
    console.debug("download boroughs source")
    await $(`${boroughScriptsPath}/download_source.sh`);
  } else {
    console.debug("skipped boroughs download")
  }

  const { stdout: ogrResult } = await $({ env: { PG_CONNECTION: flowOgrPgConnection } })(`${boroughScriptsPath}/load_source.sh`);
  context.log("ogrResult", ogrResult);
  const { stdout: sourceValidationResult } = await $({ env: { PG_CONNECTION: flowPsqlPgConnection, SCRIPTS_PATH: boroughScriptsPath } })(`${boroughScriptsPath}/validate_source.sh`);
  context.log("sourceValidationResult", sourceValidationResult)
  const { stdout: targetCreateResult } = await $({ env: { PG_CONNECTION: flowPsqlPgConnection, SCRIPTS_PATH: boroughScriptsPath } })(`${boroughScriptsPath}/tmp_create_model.sh`);
  context.log("targetCreateResult", targetCreateResult);
  const { stdout: populateTargetResult } = await $({ env: { PG_CONNECTION: flowPsqlPgConnection, SCRIPTS_PATH: boroughScriptsPath } })(`${boroughScriptsPath}/populate_model.sh`);
  context.log("populate_target", populateTargetResult);

  return { body: `boroughs finished\n` };
};

app.http('boroughs', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: boroughs
});
