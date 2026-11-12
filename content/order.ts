import type { CategoryId } from "./categories";
import type { WorkId } from "./works";

// Pin favourites to the top of a category. Anything not listed follows in works/index.ts order.
// Example: wedding: ["elegant-indian-wedding-invitation-56332146"]
export const categoryPins: Partial<Record<CategoryId, WorkId[]>> = {};
