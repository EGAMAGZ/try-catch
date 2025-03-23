# Try-Catch

A simple try-catch utility, the same one shown by Theogg in his
[video](https://www.youtube.com/watch?v=Y6jT-IkV0VM) in a
[gist](https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b), but
turned into a package.

## Usage

```typescript
import { tryCatch } from "@egamagz/try-catch";

const result = await tryCatch(promise);

if (result.error) {
  console.error("Failed to fetch user:", result.error);
  // Handle error case
} else {
  console.log("User data:", result.data);
  // Use successful result
}
```
