import { APIRequestContext, expect } from "@playwright/test";
import * as logger from "../util/logger";
export default class Delete {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async deleteRequestMethod(
    endpoint: string,
    statusCode: number,
    bookingid: string,
    token
  ) {
    try {
      const response = await this.request.delete(endpoint + bookingid, {
        headers: {
          Accept: "*/*",
          Cookie: `token=${token}`,
        },
      });
      expect(response.status()).toBe(statusCode);
      logger.Logger.info(`deleted Existing Booking`);
    } catch (error) {
      logger.Logger.error(`Error in deleted Existing Booking`);
      console.log(error);
    }
  }

  async validateDeleteRequestMethod(
    endpoint: string,
    statusCode: number,
    bookingId: string
  ) {
    try {
      const response = await this.request.get(endpoint + bookingId);
      expect(response.status()).toBe(statusCode);
      logger.Logger.info(`validated Booking`);
    } catch (error) {
      logger.Logger.error(`Error in validated Booking`);
      console.log(error);
    }
  }
}
