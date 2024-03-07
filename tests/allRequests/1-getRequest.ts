import { APIRequestContext, expect } from "@playwright/test";
import Pojo from "../util/dataGenerator";
import * as logger from "../util/logger";
export default class Get {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.get(endpoint);
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      expect(await response.text()).toContain("bookingid");
      await logger.Logger.info(`Get All Ids`);
    } catch (error) {
      await logger.Logger.error(`Error in Get All Ids`);
      console.log(error);
    }
  }

  async getNameRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.get(endpoint, {
        params: {
          firstname: Pojo.getFirstName(),
          lastname: Pojo.getLastName(),
        },
      });
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      expect(await response.text()).toContain("bookingid");
      await logger.Logger.info(`Get By Name`);
    } catch (error) {
      await logger.Logger.error(`Error in Get By Name`);
      console.log(error);
    }
  }

  async getByCheckIn_CheckOutRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ) {
    try {
      const response = await this.request.get(endpoint, {
        params: {
          checkIn: Pojo.getCheckIn(),
          checkOut: Pojo.getCheckOut(),
        },
      });
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      expect(await response.text()).toContain("bookingid");
      await logger.Logger.info(`Get By CheckIn CheckOut`);
    } catch (error) {
      await logger.Logger.error(`Error in Get By CheckIn CheckOut`);
      console.log(error);
    }
  }

  async getByIdRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined,
    bookingId: string
  ) {
    try {
      const response = await this.request.get(endpoint + bookingId);
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      const responseBody = await response.json();
      await expect(responseBody).toHaveProperty(
        "firstname",
        Pojo.getFirstName()
      );
      await expect(responseBody).toHaveProperty("lastname", Pojo.getLastName());

      await expect(responseBody).toHaveProperty(
        "totalprice",
        +Pojo.getTotalPrice()
      );
      await expect(responseBody.bookingdates).toHaveProperty(
        "checkin",
        Pojo.getCheckIn()
      );
      await expect(responseBody.bookingdates).toHaveProperty(
        "checkout",
        Pojo.getCheckOut()
      );
      await logger.Logger.info(`Get By Booking Id ${bookingId}`);
    } catch (error) {
      await logger.Logger.error(`Error in Get By Booking Id ${bookingId}`);
      console.log(error);
    }
  }
}
