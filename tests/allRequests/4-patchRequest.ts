import { APIRequestContext, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import * as logger from "../util/logger";
import Pojo from "../util/dataGenerator";
export default class Patch {
  private request: any;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async patchRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined,
    token: string,
    bookingid: string
  ) {
    try {
      Pojo.setFirstName(faker.person.firstName());
      Pojo.setTotalPrice(faker.string.numeric(4));
      const response = await this.request.patch(endpoint + bookingid, {
        headers: {
          Accept: "*/*",
          Cookie: "token=" + token,
        },
        data: {
          firstname: Pojo.getFirstName(),
          totalprice: Pojo.getTotalPrice(),
        },
      });
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);
      const responseBody = await response.json();
      console.log(responseBody);
      expect(responseBody).toHaveProperty("firstname", Pojo.getFirstName());

      expect(responseBody).toHaveProperty("totalprice", +Pojo.getTotalPrice());
      logger.Logger.info(`Updated Existing Booking`);
    } catch (error) {
      logger.Logger.error(`Error in Updated Existing Booking`);
      console.log(error);
    }
  }
}
