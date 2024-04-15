export class UserAlreadyExistsError extends Error {
  override name: string = 'UserAlreadyExistsError';
  override message: string = 'User already exists';
}
