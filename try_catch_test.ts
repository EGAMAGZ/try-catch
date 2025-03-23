import { tryCatch } from "./try_catch.ts";
import { expect } from "@std/expect";
import { test } from "@cross/test";

test("should return data when promise resolves", async () => {
  const promise = Promise.resolve("success");
  const result = await tryCatch(promise);
  expect(result.data).toBe("success");
  expect(result.error).toBeNull();
});

test("should return error when promise rejects", async () => {
  const error = new Error("failure");
  const promise = Promise.reject(error);
  const result = await tryCatch(promise);
  expect(result.data).toBeNull();
  expect(result.error).toEqual(error);
});
