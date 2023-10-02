import { Uuid } from "../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  created_at?: Date;
  is_active?: boolean;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.created_at = props.created_at ?? new Date();
    this.is_active = props.is_active ?? true;
  }

  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(entity);
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string | null): void {
    this.description = description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      is_active: this.is_active,
    };
  }
}
