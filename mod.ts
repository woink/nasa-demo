import { Application } from "https://deno.land/x/oak@v6.4.1/mod.ts"

const app = new Application()
const PORT = 8000

app.use(async (ctx, next) => {
  await next()
  const time = ctx.response.headers.get("X-Response-Time")
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const delta = Date.now() - start
  ctx.response.headers.set("X-Response-Time", `${delta}ms`)
})

app.use(async (ctx, next) => {
  ctx.response.body = "Hello World"
  await next()
})


if (import.meta.main) {
  await app.listen({
    port: PORT
  })
}