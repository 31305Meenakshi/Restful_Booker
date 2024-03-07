import { APIRequestContext, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import * as logger from "../util/logger";
import Pojo from "../util/dataGenerator";
export default class Put {
  private request: any;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async putRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined,
    token: string,
    bookingid: string
  ) {
    try {
      Pojo.setFirstName(faker.person.firstName());
      Pojo.setLastName(faker.person.lastName());
      Pojo.setTotalPrice(faker.string.numeric(4));
      Pojo.setCheckIn(DateTime.now().toFormat("yyyy-MM-dd"));
      Pojo.setCheckOut(DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"));
      const response = await this.request.put(endpoint + bookingid, {
        headers: {
          Accept: "*/*",
          Cookie: `token=${token}`,
        },
        data: {
          firstname: Pojo.getFirstName(),
          lastname: Pojo.getLastName(),
          totalprice: Pojo.getTotalPrice(),
          depositpaid: true,
          bookingdates: {
            checkin: Pojo.getCheckIn(),
            checkout: Pojo.getCheckOut(),
          },
          additionalneeds: "Breakfast",
        },
      });
      expect(response.status()).toBe(statusCode);
      expect(response.headers()["content-type"]).toBe(contentType);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty("firstname", Pojo.getFirstName());

      expect(responseBody).toHaveProperty("lastname", Pojo.getLastName());

      expect(responseBody).toHaveProperty("totalprice", +Pojo.getTotalPrice());
      expect(responseBody.bookingdates).toHaveProperty(
        "checkin",
        Pojo.getCheckIn()
      );

      expect(responseBody.bookingdates).toHaveProperty(
        "checkout",
        Pojo.getCheckOut()
      );
      logger.Logger.info(`Updated Existing Booking`);
    } catch (error) {
      logger.Logger.error(`Error in Updated Existing Booking`);
      console.log(error);
    }
  }
}
