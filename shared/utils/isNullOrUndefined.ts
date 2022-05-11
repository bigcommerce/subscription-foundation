/**
 * Checks if a value **is** null or undefined.
 * @param value The value to evaluate.
 * @returns Whether the value **is** null or undefined.
 */
 export function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined {
  return typeof value === "undefined" || value === null;
}

/**
 * Checks whether a specified string is null or an empty string.
 * @param value The string to test.
 * @returns `true` if the value **is** null or an empty string, otherwise `false`.
 */
export function isStringNullOrEmpty(value: string): boolean {
  if (isNullOrUndefined(value) || typeof value !== "string") {
    return true;
  }
  return value.length == 0;
}

/**
 * Checks if a value is null or undefined, returning a
 * default value in such case.
 * @param value The value to evaluate.
 * @param defaultValue The default value to return.
 * @returns The `value` or `defaultValue`.
 */
export function getOrDefault<T>(
  value: T | null | undefined,
  defaultValue: T
): T {
  return isNullOrUndefined(value) ? defaultValue : value;
}