import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";
import { DomainTree } from "../utils/types";
import { buildOptionsSchema } from "../utils/zod-schemas";
import { ogr2ogrTemplatePath, psqlTemplatePath } from "../utils/ constants";

const boroughDomainTree: DomainTree = {
  boroughs: {
    dependencies: [],
    dependents: [],
  }
}

const baseDomainPath = "src/scripts/boroughs";
const artifactSubPath = "sources";

export async function boroughs(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("boroughDomainTree", boroughDomainTree);

  const buildOptions = buildOptionsSchema.parse(await request.json());
  if (buildOptions.skipDownloads !== true) {
    console.debug("download boroughs source")
    await $(`${baseDomainPath}/download_source.sh`);
  } else {
    console.debug("skipped boroughs download")
  }

  const { stdout: ogrResult } = await $({ env: { SOURCE_DATA_FILE: `${artifactSubPath}/dcp_borough_boundary.shp.zip` } })(ogr2ogrTemplatePath);
  context.log("ogrResult", ogrResult);
  const { stdout: sourceValidationResult } = await $({ env: { SQL_FILE: `${baseDomainPath}/create_source_validation.sql` } })(psqlTemplatePath);
  context.log("sourceValidationResult", sourceValidationResult)
  const { stdout: targetCreateResult } = await $({ env: { SQL_FILE: `${baseDomainPath}/tmp_create_model.sql` } })(psqlTemplatePath);
  context.log("targetCreateResult", targetCreateResult);
  const { stdout: populateTargetResult } = await $({ env: { SQL_FILE: `${baseDomainPath}/populate_model.sql` } })(psqlTemplatePath);
  context.log("populate_target", populateTargetResult);

  return { body: `boroughs finished\n` };
};

app.http('boroughs', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: boroughs
});
