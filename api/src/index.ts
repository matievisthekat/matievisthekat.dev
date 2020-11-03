import express from "express";
import { join } from "path";
import { Route } from "./types";
import { Logger } from "./util/Logger";
import { Util } from "./util/Util";

const app = express();
const port = process.env.PORT || 3000;

const routeFiles = Util.findNested(join(__dirname, "routes"));
const routes: Route[] = routeFiles.map((f) => require(f).route).sort((a, b) => b.path.length - a.path.length);
console.log(routes);
for (const route of routes) {
  app.use(route.path, route.router);
}

app.listen(port, () => Logger.log(`Listening on port http://localhost:${port}/`));
