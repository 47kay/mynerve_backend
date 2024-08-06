import { config } from "dotenv";
import { resolve } from "path";

const env = process.env.NODE_ENV || "development";

config({ path: resolve(__dirname, `../../env/.env.${env.toLowerCase()}`) });

let environmentVariables: any = {};
for (const key in process.env) {
  environmentVariables = {
    ...environmentVariables,
    [key]: process.env[key],
  };
}

export default environmentVariables;
