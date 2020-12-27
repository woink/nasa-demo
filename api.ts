import { Router } from 'https://deno.land/x/oak@v6.4.1/mod.ts'
import * as planets from "./models/planets.ts"
import * as launches from "./models/launches.ts"

const router = new Router()

router.get("/", (ctx) => {
  ctx.response.body = "NASA TEST"
})

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAll()
})

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll()
})

router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id))
    if (launchesList) {
      ctx.response.body = launchesList
    } else {
      ctx.throw(400, "Launch with that ID doesn't exist")
    }
  }
})

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body().value

  launches.addOne(body)

  ctx.response.body = { success: true }
  ctx.response.status = 201
})

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id))
    ctx.response.body = { success: result }
  }
})

export default router 