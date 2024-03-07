import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import * as logger from "../util/logger";
import Pojo from "../util/dataGenerator";
export default class Post {
  private request: any;
  constructor(request) {
    this.request = request;
  }
  async postRequestMethod(
    endpoint: string,
    statusCode: number,
    contentType: string | undefined
  ): Promise<string> {
    let bookingId;
    try {
      Pojo.setFirstName(faker.person.firstName());
      Pojo.setLastName(faker.person.lastName());
      Pojo.setTotalPrice(faker.string.numeric(4));
      Pojo.setCheckIn(DateTime.now().toFormat("yyyy-MM-dd"));
      Pojo.setCheckOut(DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"));
      const response = await this.request.post(endpoint, {
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
      expect(responseBody.booking).toHaveProperty(
        "firstname",
        Pojo.getFirstName()
      );

      expect(responseBody.booking).toHaveProperty(
        "lastname",
        Pojo.getLastName()
      );

      expect(responseBody.booking).toHaveProperty(
        "totalprice",
        +Pojo.getTotalPrice()
      );
      expect(responseBody.booking.bookingdates).toHaveProperty(
        "checkin",
        Pojo.getCheckIn()
      );

      expect(responseBody.booking.bookingdates).toHaveProperty(
        "checkout",
        Pojo.getCheckOut()
      );
      console.log(responseBody);
      bookingId = responseBody.bookingid;
      logger.Logger.info(`Creating New Booking`);
    } catch (error) {
      logger.Logger.error(`Error in Creating New Booking`);
      console.log(error);
    }
    return bookingId;
  }
}
