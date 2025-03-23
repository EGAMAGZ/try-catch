/**
 * Represents a successful result with data and no error.
 * @template T The type of the data.
 * @param {T} data The successful result data.
 * @param {null} error Always null for successful results.
 */
export type Success<T> = {
  data: T;
  error: null;
};

/**
 * Represents a failed result with an error and no data.
 * @template E The type of the error.
 * @param {null} data Always null for failed results.
 * @param {E} error The error that occurred.
 */
export type Failure<E> = {
  data: null;
  error: E;
};

/**
 * Represents either a successful result or a failed result.
 * @template T The type of the data.
 * @template E The type of the error, defaults to Error.
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps a promise in a try-catch block and returns a Result object.
 *
 * @example Usage of tryCatch with async function
 * ```typescript
 * import { tryCatch, Result } from "@egamagz/try-catch";
 *
 * type User = {
 *   id: string;
 *   name: string;
 *   email: string;
 * };
 *
 * async function fetchUserData(userId: string): Promise<Result<User>> {
 *   const promise = fetch(`/api/users/${userId}`)
 *     .then(response => response.json());
 *   return tryCatch(promise);
 * }
 *
 * async function main() {
 *   const result = await fetchUserData("123");
 *   if (result.error) {
 *     console.error("Failed to fetch user:", result.error);
 *     // Handle error case
 *   } else {
 *     console.log("User data:", result.data);
 *     // Use successful result
 *   }
 * }
 * ```
 *
 * @template T The type of the data returned by the promise.
 * @template E The type of the error, defaults to Error.
 * @param {Promise<T>} promise The promise to be executed.
 * @returns {Promise<Result<T, E>>} A promise that resolves to a Result object.
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
