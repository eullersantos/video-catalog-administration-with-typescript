import { Op } from "sequelize";
import { Entity } from "../../../../shared/domain/entity";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { SearchParams } from "../../../../shared/domain/repository/search-params";
import { SearchResult } from "../../../../shared/domain/repository/search-result";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../domain/category.entity";
import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from "../../../domain/category.repository";
import { CategoryModel } from "./category.model";
import { CategoryModelMapper } from "./category-model-mapper";

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ["name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    const model = CategoryModelMapper.toModel(entity);
    await this.categoryModel.create(model.toJSON());
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    const models = entities.map((entity) =>
      CategoryModelMapper.toModel(entity)
    );
    await this.categoryModel.bulkCreate(models);
  }

  async update(entity: Category): Promise<void> {
    const id = entity.category_id.id;

    const model = this._get(id);

    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }

    const modelToUpdate = CategoryModelMapper.toModel(entity);
    await this.categoryModel.update(modelToUpdate.toJSON(), {
      where: { category_id: entity.category_id.id },
    });
  }

  async delete(category_id: Uuid): Promise<void> {
    const id = category_id.id;

    const affectedRows = await this.categoryModel.destroy({
      where: { category_id: id },
    });

    if (affectedRows !== 1) {
      throw new NotFoundError(id, this.getEntity());
    }
  }

  async findById(entity_id: Uuid): Promise<Category | null> {
    return this._get(entity_id.id);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();

    return models.map((entity) => CategoryModelMapper.toEntity(entity));
  }

  private async _get(id: string) {
    const model = await this.categoryModel.findByPk(id);

    if (!model) return null;

    return CategoryModelMapper.toEntity(model);
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [["created_at", "desc"]] }),
      offset,
      limit,
    });

    return new CategorySearchResult({
      items: models.map((model) => {
        return new Category({
          category_id: new Uuid(model.category_id),
          name: model.name,
          description: model.description,
          is_active: model.is_active,
          created_at: model.created_at,
        });
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
