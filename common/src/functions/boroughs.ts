import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";
import { DomainTree } from "../utils/types";
import { buildOptionsSchema } from "../utils/zod-schemas";

const boroughDomainTree: DomainTree = {
  boroughs: {
    dependencies: [],
    dependents: [],
  }
}

export async function boroughs(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("boroughDomainTree", boroughDomainTree);

  const buildOptions = buildOptionsSchema.parse(await request.json());
  if (buildOptions.skipDownloads !== true) {
    console.debug("download boroughs source")
    await $("src/scripts/spaces_alias.sh");
    await $("src/scripts/boroughs/download_source.sh");
  } else {
    console.debug("skipped boroughs download")
  }

  return { body: "boroughs loaded successfully\n" };
};

app.http('boroughs', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: boroughs
});
