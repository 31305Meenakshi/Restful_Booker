import { APIRequestContext, expect } from "@playwright/test";
import * as logger from "../util/logger";
import Pojo from "../util/dataGenerator";

export default class Token {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async token(
    endpoint: string,
    authUserName: string | undefined,
    authPassword: string | undefined,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.post(endpoint, {
        data: {
          username: authUserName,
          password: authPassword,
        },
      });

      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      const responseBody = await response.json();
      expect(await response.text()).toContain("token");
      const authToken = await responseBody.token;
      logger.Logger.info(`authenticate Token ${authToken}`);
      return authToken;
    } catch (error) {
      logger.Logger.error(`Error in authenticate Token`);
      console.log(error);
    }
  }
}
