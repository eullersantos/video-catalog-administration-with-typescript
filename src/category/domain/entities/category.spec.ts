import { Category } from "./category";
import { validate as uuidValidate } from "uuid";

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

  test("id field", () => {
    const data = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: 'c73e2a73-cbc0-4a87-b90e-8278c550d8eb' },
    ]

    data.forEach(i => {
      let category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
    })
  })

  test("getter of name props", () => {
    const category = new Category({ name: 'Movie' })
    expect(category.name).toBe('Movie')
  });

  test("getter of description props", () => {
    let category = new Category({
      name: 'Movie',
    })

    expect(category.description).toBeNull()

    category = new Category({
      name: 'Movie',
      description: 'some description'
    })

    expect(category.description).toBe('some description')
  });

  test("getter and setter of description props", () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.description).toBeNull()

    category = new Category({
      name: 'Movie',
      description: 'some description'
    })
    expect(category.description).toBe('some description')

    category = new Category({
      name: 'Movie',
    })
    category["description"] = 'other description'
    expect(category.description).toBe('other description')

    category = new Category({
      name: 'Movie',
    })
    category["description"] = null
    expect(category.description).toBeNull()

    category = new Category({
      name: 'Movie',
    })
    category["description"] = undefined
    expect(category.description).toBeNull()
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: true
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: false
    })
    expect(category.is_active).toBeFalsy()
  });

  test("getter of created_at props", () => {
    let category = new Category({ name: 'Movie' })
    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({ name: 'Movie', created_at })
    expect(category.created_at).toBe(created_at)
  });
});
