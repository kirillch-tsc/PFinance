export class ModelValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelValidationError";
  }
}

export function assertModel(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new ModelValidationError(message);
  }
}
