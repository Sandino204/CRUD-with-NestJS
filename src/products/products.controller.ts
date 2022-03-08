/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('storeId') storeId: string,
  ): Product {
    return this.productsService.insertProduct({
      desc: description,
      price: price,
      storeId: storeId,
      title: title,
    });
  }

  @Get()
  getAllProducts(): Product | Product[] {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): Product | Product[] {
    const product = this.productsService.getProduct({ id });
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('storeId') storeId: string,
  ) {
    this.productsService.updateProduct({
      id,
      title,
      description,
      price,
      storeId,
    });
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.removeProduct(id);
  }
}
