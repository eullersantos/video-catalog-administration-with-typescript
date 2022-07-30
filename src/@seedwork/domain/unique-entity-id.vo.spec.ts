import InvalidUuidError from "../errors/invalid-uuid-error"
import UniqueEntityId from "./unique-entity-id.vo"

describe("UniqueEntityId Unit tests", () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('fake_id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  })
})