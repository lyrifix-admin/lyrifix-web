import { createRequestHandler } from "@react-router/vercel";
import * as build from "../build/server/index.js";

export default createRequestHandler({ build });
