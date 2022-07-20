import { Category } from "./category";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {

    let category = new Category({
      name: "Movie",
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
      created_at: expect.any(Date)
    })




    category = new Category({
      name: 'Movie 2',
      description: 'some description',
      is_active: false
    })

    expect(category.props).toStrictEqual({
      name: 'Movie 2',
      description: 'some description',
      is_active: false,
      created_at: expect.any(Date)
    })




    category = new Category({
      name: 'Movie 3',
      description: 'other description',
    })

    expect(category.props).toMatchObject({
      name: 'Movie 3',
      description: 'other description',
    })





    category = new Category({
      name: 'Movie 4',
      is_active: true
    })

    expect(category.props).toMatchObject({
      name: 'Movie 4',
      is_active: true
    })




    const created_at = new Date()
    category = new Category({
      name: 'Movie 4',
      created_at
    })

    expect(category.props).toMatchObject({
      name: 'Movie 4',
      created_at
    })
  });
});
