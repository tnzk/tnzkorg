---
title: Making Web APIs Type-safe with Aspida 
distro: https://dev.to/tnzk/making-web-apis-type-safe-with-aspida-fkf
---

Types matter. Even with the naive type system of C/C++, I used to feel somehow protected.

TypeScript enables for JavaScript libraries to provide their type definitions but Web APIs. Actually, majority of APIs lack precise documentation, let alone type definition.

[Aspida](https://github.com/aspidajs/aspida) fills this blind spot. Few HTTP client libraries on NPM provide this capability.

In this article, I demonstrate how we can invoke Discourse API as an example in type-safe manner.

# Setting up Aspida

You can setup Aspida according [the official README](https://github.com/aspidajs/aspida).

Since Aspida provides just an abstraction layer for type-safety, you need to chose one of HTTP client library as its back-end. Major libraries ([axios](https://github.com/aspidajs/aspida/tree/master/packages/aspida-axios), [ky](https://github.com/aspidajs/aspida/tree/master/packages/aspida-ky), [fetch](https://github.com/aspidajs/aspida/tree/master/packages/aspida-fetch) and [node-fetch](https://github.com/aspidajs/aspida/tree/master/packages/aspida-node-fetch)) seem to be supported.

Here, I pick axios.

# Overview of Discourse API

You may know that [Discourse](https://www.discourse.org/) is an open source discussion platform. 

I try accessing an instance of Discourse via its Web API and show the names of visible Categories in the forum for demonstration.

Discourse API is a simple RESTful API, with [nice and sufficient documentation](https://docs.discourse.org/). I'm not so fluent about the API, but it seems to cover almost all of its functionalities.

Since [I'm the Server Admin of a Mastodon server](https://ichiji.social/@tnzk), I chose [Mastodon Meta Discussion Board](https://discourse.joinmastodon.org/) for an example :)

# Creating Type definition

First of all, we need the type definition.

You can assign types for the response and request parameters of your favorite APIs with Aspida, by putting type definition files in `$REPO_ROOT/apis/` like:

```typescript
export type CategoryList = {
    can_create_category: boolean,
    can_create_topic: boolean,
    draft: boolean,
    draft_key: string,
    draft_sequence: number,
    categories: Category[]
}

export type Category = {
    id: number,
    name: string,
    color: string,
    text_color: string
    slug: string,
    topic_count: number,
    post_count: number,
    position: number,
    description: string,
    description_text: string,
    topic_url: string,
    logo_url: string,
    background_url: string,
    read_restricted: boolean,
    permission: number,
    notification_level: string,
    can_edit: boolean,
    topic_template: string,
    has_children: boolean,
    topics_day: number,
    topics_week: number,
    topics_month: number,
    topics_year: number,
    topics_all_time: number,
    description_excerpt: string,
}

export type Methods = {
    get: {
        resBody: {
            category_list: CategoryList
        },
    }
}
```

This time I put this as `categories.ts`.

This is a hand-crafted type definition :tm: looking up [the API documentation](https://docs.discourse.org/#tag/Categories) :muscle:

# Building the Type definition

Once you have created the type definition, you need to build before using in application:

```bash
$ yarn run aspida --build
```

You may be happier by having this defined in `package.json`.

# Invoking the API in Application

Now you can invoke the API in type-safe manner! You can write your application like below. 

```javascript
import dotenv from "dotenv"
import axios from "axios"
import aspida from "@aspida/axios"
import api from "../apis/$api"
import type { CategoryList } from "../apis/categories"

dotenv.config()

const axiosConfig = {
    timeout: 3000,
    baseURL: 'https://discourse.joinmastodon.org',
    headers: {
        'Accept': 'application/json',
//        'Api-Username': process.env.DISCOURSE_API_USERNAME,
//        'Api-Key': process.env.DISCOURSE_API_KEY,
    }
}

let client = api(aspida(axios, axiosConfig))

;(async () => {
    client.categories.get()
        .then(response => {
            let category_list = response.data.category_list
            category_list.categories.forEach(cat => console.log(cat.name))
        })
        .catch(error => console.log(error))
})()
```

It seems you need to import types explicitly if you want enable code-completion.

Also, you can pass Axios options at instantiation of Aspida. I had confirmed it worked well with headers for authentication.

This results:

```bash
$ yarn run start
Server administration
General
Core development
App development
Translation
Meta feedback
Feedback
Done in 10.56s.
```

![](https://dev-to-uploads.s3.amazonaws.com/i/jhg8u8v7ym1n90on6go2.png)

Looks good :+1:

You can see complete code at: https://github.com/tnzk/aspida-demo

You're now embraced in type system, so you won't break a thing like:

```
category_list.categories.forEach(cat => console.log(cat.name * 1))
```

because this will be detected **at compile time**:

```
src/discourse-list-category.ts:25:65 - error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.

25             category_list.categories.forEach(cat => console.log(cat.name * 1))
```


# Upnext

Aspida has another interesting functionality which automatically build type definitions from OpenAPI Specification.

Since Discourse API provides it, we'll try this in next article :)
