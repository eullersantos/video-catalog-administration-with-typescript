import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  test("constructor", () => {
    let category = new Category({ name: "Movie" });
    expect(category.category_id).toBeUndefined();
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({
      name: "Movie 02",
      description: "Some Description",
      is_active: false,
      created_at,
    });
    expect(category.category_id).toBeUndefined();
    expect(category.name).toBe("Movie 02");
    expect(category.description).toBe("Some Description");
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBe(created_at);
  });
});
