import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ParsedQs } from 'qs';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // Add Product: /product/create
  @Post('/create')
  async createOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO) {
    const order = await this.orderService.createOrder(createOrderDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Order Successfully Created',
      product: order,
    });
  }

  // Get Products /product
  // @Get('/list')
  @Get('/')
  @ApiQuery({})
  async getProducts(@Query() query?: ParsedQs) {
    const orders = await this.orderService.getOrders(query);
    return { orders };
  }

  // GET single product: /product/5c9d46100e2e5c44c444b2d1
  @Get('/:orderID')
  async getOrder(@Res() res, @Param('orderID') orderID) {
    const order = await this.orderService.getProduct(orderID);
    if (!order) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json(order);
  }

  @Get('/count/count')
  @ApiQuery({})
  async count(@Query() query?: ParsedQs) {
    return { data: await this.orderService.count(query) };
  }

  // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
  @Delete('/delete/:orderID')
  async deleteOrder(@Res() res, @Param('orderID') orderID) {
    const orderDeleted = await this.orderService.deleteOrder(orderID);
    if (!orderDeleted) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json({
      orderDeleted,
      message: 'Order Deleted Successfully',
    });
  }

  // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateOrderDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.orderService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      updatedProduct,
    });
  }
}
