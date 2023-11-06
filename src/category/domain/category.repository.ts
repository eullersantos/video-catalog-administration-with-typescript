import { IRepository } from "../../shared/domain/repository/category.interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity";

export interface ICategoryRepository extends IRepository<Category, Uuid> {}
