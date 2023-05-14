/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function config() {
  const env = dotenv.config({
    path: process.env.ENV ? process.env.ENV : '.env'
  });
  dotenvExpand(env);
}
