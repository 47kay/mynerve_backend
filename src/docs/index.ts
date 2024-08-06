import { basicInfo } from "./basicInfo";
import { docServers as servers } from "./servers";
import { docComponents as components } from "./components";
import { tags } from "./tags";
import { paths } from "./paths/index";
import { JsonObject } from "swagger-ui-express";

export const swaggerDocs: JsonObject = {
  ...basicInfo,
  servers,
  paths,
  components,
  tags,
};
