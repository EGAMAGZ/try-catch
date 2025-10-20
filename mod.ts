/**
 * Re-exports the main try-catch result utility API.
 *
 * This module provides the `tryCatch` function that wraps operations (sync or async)
 * and returns a result object instead of throwing exceptions.
 *
 * @module
 * @example
 * ```ts
 * import { tryCatch } from "./mod.ts";
 *
 * // Async usage
 * const apiResult = await tryCatch(fetch("https://api.example.com"));
 * if (apiResult.error) {
 *   console.error("Request failed:", apiResult.error);
 * } else {
 *   console.log("Status:", apiResult.data.status);
 * }
 *
 * // Sync usage
 * const parseResult = tryCatch(() => JSON.parse(jsonString));
 * if (parseResult.error) {
 *   console.error("Parse failed:", parseResult.error);
 * } else {
 *   console.log("Parsed:", parseResult.data);
 * }
 * ```
 */
export * from "./try_catch.ts";
