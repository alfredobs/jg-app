/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  // Get all products
  async getOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }

  // Get a single Product
  async getProduct(productID: string): Promise<Order> {
    const product = await this.orderModel.findById(productID);
    return product;
  }

  // Post a single product
  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const newProduct = new this.orderModel(createOrderDTO);
    return newProduct.save();
  }

  // Delete Product
  async deleteOrder(orderID: any): Promise<Order> {
    const deletedOrder = await this.orderModel.findOneAndDelete(orderID);
    return deletedOrder;
  }

  // Put a single product
  async updateProduct(
    productID: string,
    createOrderDTO: CreateOrderDTO,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      productID,
      createOrderDTO,
      { new: true },
    );
    return updatedOrder;
  }
}
