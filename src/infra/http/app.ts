import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import sls from "serverless-http";

// domain
import { userRouter } from "../../modules/users/infra/http/router";
import { journeyRouter } from "../../modules/journeys/infra/http/router";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));
app.use('/api', userRouter)
app.use('/api', journeyRouter)
// import { APIGatewayProxyHandler } from "aws-lambda";
// import "source-map-support/register";

export const hello = sls(app);
