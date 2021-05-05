---
title: Trying openapi2aspida to auto-generate Type Definition for a Web API 
distro: https://dev.to/tnzk/trying-openapi2aspida-to-auto-generate-type-definition-for-a-web-api-2mpj/
---

[Previously](https://dev.to/tnzk/making-web-apis-type-safe-with-aspida-fkf), we had explored how [Aspida](https://github.com/aspidajs/aspida) provides a way to integrate external Web APIs into your code in type-safe manner.

But writing down the complete type definition of an API by hand hardly seems very fun. Rather, we'd like it to be generated automatically.

[openapi2aspida](https://github.com/aspidajs/openapi2aspida) tools gives this functionality, as long as the API provides OpenAPI 3.0 or Swagger schema.

# Generate Type Definition

Since you've followed instruction in previous post, you would have `apis` directory, which this time `openapi2aspida` expects it to be absent. So we need remove this before trying this tool.

```bash
$ rm -rf $REPO_ROOT/apis
```

Create aspida.config.js, Get JSON schema path

Run this to generate and pour packages into `apis/`:

```bash
$ npx openapi2aspida --build
```

# Try using

```bash
$ yarn run aspida-mock --build
> Property 'resHeaders' is missing in type '{ status: 200; resBody: { about: { description: string; title: string; locale: string; version: string; https: true; moderators: { id: number; username: string; avatar_template: string; name: string; title: string; }[]; admins: { ...; }[]; }; }; }' but required in type 'BaseResponse<{ about?: { description?: string; title?: string; locale?: string; version?: string; https?: boolean; moderators?: { id?: number; username?: string; avatar_template?: string; name?: string; title?: string; }[]; admins?: { ...; }[]; }; }, unknown, 200>'
```

Wow I thought I had tried to compile C++ abusing class templates here.

This error seems to occur because Discourse API doc (perhaps including OpenAPI schema). Discourse maintainers said so in the [doc](https://docs.discourse.org/) and [the thread](https://meta.discourse.org/t/discourse-api-documentation/22706/257).

Let the linter explain before deep diving this ourselves:

```bash
$ yarn global add ibm-openapi-validator
$ curl -O https://docs.discourse.org/openapi.json
$ lint-openapi openapi.json | head -n 10

[Warning] No .validaterc file found. The validator will run in default mode.
To configure the validator, create a .validaterc file.

errors

  Message :   Parameters MUST have their data described by either `schema` or `content`.
  Path    :   paths./c/{id}.json.get.parameters.0
  Line    :   296

$ lint-openapi openapi.json | wc -l
1318
```

# Conclusion

We have tried Discourse API and found it lacked an OpenAPI-compiliant Schema. While `openapi2aspida` doesn't seem to work very well in this situation, but if you are in a project where you have well-written OpenAPI schema, `openapi2aspida` will be promising for your development.

Unfortunately, you wouldn't find so many projects with OpenAPI Schema out there at the moment. Yet [we saw previously](https://dev.to/tnzk/making-web-apis-type-safe-with-aspida-fkf), we can start writing type definition by hand as necessary.

If you'll happen to be design a web API, you can contribute the OpenAPI ecosystem by starting it with writing OpenAPI Schema for the API. This might be encouraged from test-driven point of view.
