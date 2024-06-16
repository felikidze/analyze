import * as express from "express";
import {default as indexRouter} from "./routes/index.js";
import {default as AuthRouter} from "./routes/Auth.js";
import {default as ParserRouter} from "./routes/Parser.js";
import {default as ScanRouter} from "./routes/Scan.js";
import {default as DomainRouter} from "./routes/Domain.js";

export default function(app) {
  app.use(express.json());

  app.use("/", indexRouter);
  app.use("/auth", AuthRouter);
  app.use("/parse", ParserRouter);
  app.use("/scans", ScanRouter);
  app.use("/domains", DomainRouter);
};