export type CategoryConstructorProps = {
  category_id?: string;
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
  category_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id;
    this.name = props.name;
    this.description = props.description ?? null;
    this.created_at = props.created_at ?? new Date();
    this.is_active = props.is_active ?? true;
  }

  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
  }
}