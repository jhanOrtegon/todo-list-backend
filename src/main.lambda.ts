import { Handler } from "aws-lambda";
import serverlessExpress from "@vendia/serverless-express";
import { createApp } from "./bootstrap";

let server: any;

export const handler: Handler = async (event, context) => {
  if (!server) {
    const app = await createApp();
    server = serverlessExpress({ app });
  }
  return server(event, context);
};
