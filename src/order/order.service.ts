/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDTO } from './dto/create-order.dto';
import { QueryParser } from 'src/helper/query-parser.helper';
import { ParsedQs } from 'qs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  // Get all products
  async getOrders(query: ParsedQs = {}): Promise<Order[]> {
    const res = await QueryParser.docByQuery<Order>(this.orderModel, query);
    return res.data as Order[];
  }
  // Count all orders
  async count(query: ParsedQs = {}): Promise<number> {
    const res = await QueryParser.docByQuery<Order>(
      this.orderModel,
      query,
      true,
    );
    console.log(res);
    return res.data as number;
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
    const deletedOrder = await this.orderModel.findOneAndDelete({
      _id: orderID,
    });
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
