/**
 * Successful result containing data and no error.
 *
 * @template T - Type of the successful value.
 */
type Success<T> = { data: T; error: null }

/**
 * Failed result containing no data and an error.
 *
 * @template E - Type of the error.
 */
type Failure<E> = { data: null; error: E }

/**
 * Result of a synchronous operation.
 *
 * @template T - Type of the successful value.
 * @template E - Type of the error.
 */
type ResultSync<T, E> = Success<T> | Failure<E>

/**
 * Result of an asynchronous operation.
 *
 * @template T - Type of the successful value.
 * @template E - Type of the error.
 */
type ResultAsync<T, E> = Promise<ResultSync<T, E>>

/**
 * Wraps an async operation (Promise) and returns a result object instead of throwing.
 *
 * @template T - Type of the successful value.
 * @template E - Type of the error (defaults to Error).
 * @param operation - A Promise to execute.
 * @returns A Promise that resolves to a result object with { data, error }.
 * @example
 * ```ts
 * // Fetch data from API
 * const result = await tryCatch(fetch("https://api.example.com/data"));
 * if (result.error) {
 *   console.error("Failed to fetch:", result.error);
 * } else {
 *   console.log("Received:", result.data);
 * }
 * ```
 * @example
 * ```ts
 * // Custom error type
 * interface ApiError {
 *   code: number;
 *   message: string;
 * }
 * const result = await tryCatch<Response, ApiError>(fetchUser(123));
 * if (result.error) {
 *   console.error(`Error ${result.error.code}: ${result.error.message}`);
 * }
 * ```
 */
export function tryCatch<T, E = Error>(operation: Promise<T>): ResultAsync<T, E>
/**
 * Wraps a sync function and returns a result object instead of throwing.
 *
 * @template T - Type of the successful value.
 * @template E - Type of the error (defaults to Error).
 * @param operation - A zero-argument function to execute.
 * @returns A result object with { data, error }.
 * @example
 * ```ts
 * // Parse JSON safely
 * const result = tryCatch(() => JSON.parse(jsonString));
 * if (result.error) {
 *   console.error("Invalid JSON:", result.error);
 * } else {
 *   console.log("Parsed:", result.data);
 * }
 * ```
 * @example
 * ```ts
 * // Division operation
 * const result = tryCatch(() => {
 *   if (divisor === 0) throw new Error("Division by zero");
 *   return numerator / divisor;
 * });
 * if (result.error) {
 *   console.error("Math error:", result.error.message);
 * } else {
 *   console.log("Result:", result.data);
 * }
 * ```
 */
export function tryCatch<T, E = Error>(operation: () => T): ResultSync<T, E>
export function tryCatch<T, E = Error>(operation: Promise<T> | (() => T)): ResultSync<T, E> | ResultAsync<T, E> {
  if (operation instanceof Promise) {
    return operation.then((value: T) => ({ data: value, error: null })).catch((error: E) => ({ data: null, error }))
  }

  try {
    const data = operation()
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as E }
  }
}
