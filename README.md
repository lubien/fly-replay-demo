# fly-replay-demo

Example app to use [Fly-Replay](https://fly.io/docs/reference/dynamic-request-routing/) to route /blog requests to another app.

We used NodeJS for simplicity but any language that can create a HTTP server will do.

## How this works?

This repo contains two fly apps: `fly-replay-app` and `fly-replay-app`. The blog app doesn't need to know anything about how Fly-Replay works, 
the real magic happens in `fly-replay-app`.

At `fly-replay-app` [index.js](https://github.com/lubien/fly-replay-demo/blob/ca0a448205314214206ffe8ffe2d824beb69bf03/replay-app/index.js#L5-L8) 
we have the following snippet:

```js
app.all('/blog*', function replayToBlog(req, res) {
  res.set('Fly-Replay', 'app=fly-replay-blog')
  res.status(204).send('')
})
```

All requests that go to any path that match `/blog*` will receive an empty response with the header `Fly-Replay` containing the value
`'app=fly-replay-blog'`. Fly proxy will understand that and will replay the exact same request on the other app without you needing
to do any sort of reverse-proxy magic.

## Demo

You can verify it here:

* Replay app: https://fly-replay-app.fly.dev
* Replay app rerouting to blog: https://fly-replay-app.fly.dev/blog

## Notes

- The blog app doesn't have IP public addresses since it's going to be routed from `fly-replay-app`.
- `Fly-Replay` won't change the `/path` on the URL so our blog must handle requests that start with `/blog*` too.

## Docs

* [Dynamic Request Routing](https://fly.io/docs/reference/dynamic-request-routing/)
