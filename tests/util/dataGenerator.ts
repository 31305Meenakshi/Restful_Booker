export default class DataGenerator {
  private static firstName: string;
  private static lastName: string;
  private static totalPrice: string;
  private static checkIn: string;
  private static checkOut: string;
  private static additionalNeeds: string;

  public static getFirstName(): string {
    return this.firstName;
  }
  public static getLastName(): string {
    return this.lastName;
  }
  public static getTotalPrice(): string {
    return this.totalPrice;
  }
  public static getCheckIn() {
    return this.checkIn;
  }
  public static getCheckOut() {
    return this.checkOut;
  }
  public static getadditionalNeeds() {
    return this.additionalNeeds;
  }

  public static setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  public static setLastName(lastName: string) {
    this.lastName = lastName;
  }
  public static setTotalPrice(totalPrice: string) {
    this.totalPrice = totalPrice;
  }
  public static setCheckIn(checkIn: string) {
    this.checkIn = checkIn;
  }
  public static setCheckOut(checkOut: string) {
    this.checkOut = checkOut;
  }
  public static setadditionalNeeds(additionalNeeds: string) {
    this.additionalNeeds = additionalNeeds;
  }
}
