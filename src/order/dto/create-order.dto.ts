/* eslint-disable prettier/prettier */
export class CreateOrderDTO {
  readonly createdAt?: Date;

  readonly make: string;
  readonly vin: string;
  readonly model: string;
  readonly year: string;
  readonly milesIn: string;
  readonly milesOut: string;
  readonly customerName: string;
  readonly Tel: string;
  readonly address: string;
  readonly pickUpAt: string;
  readonly email: string;
  readonly problem: string;
  readonly repairMade: string;
}
