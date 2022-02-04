/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryPublic } from "./dto/category";
import { CategoryService } from './category.service';
import { CategoryCreateInput } from './dto/category-create.input';
import { Category } from "./category.entity";

@Resolver(of => CategoryPublic)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService){}
    @Query(returns => [CategoryPublic], {name: 'getAllCategories'})
    async getAllCategories(): Promise<CategoryPublic[]>{
        return await this.categoryService.findAll();
    }

    @Mutation(returns => CategoryPublic, {name: 'createCategory'})
    async createCategory(
        @Args('input') input: CategoryCreateInput
    ): Promise<CategoryPublic>{
        const categoryEntity = new Category();
        categoryEntity.name = input.name;
        categoryEntity.slug = input.slug;
        return this.categoryService.create(categoryEntity);
    }
}