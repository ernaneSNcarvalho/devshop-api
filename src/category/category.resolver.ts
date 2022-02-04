/* eslint-disable prettier/prettier */
import { Query, Resolver } from "@nestjs/graphql";
import { CategoryPublic } from "./dto/category";
import { CategoryService } from './category.service';

@Resolver(of => CategoryPublic)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService){}
    @Query(returns => [CategoryPublic], {name: 'getAllCategories'})
    async getAllCategories(): Promise<CategoryPublic[]>{
        return await this.categoryService.findAll();
    }
}