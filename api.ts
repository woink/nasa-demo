import { Router } from 'https://deno.land/x/oak@v6.4.1/mod.ts'
import * as planets from "./models/planets.ts"

const router = new Router()

router.get("/", (ctx) => {
  ctx.response.body = "NASA TEST"
})

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAllPlanets()
})
export default router 