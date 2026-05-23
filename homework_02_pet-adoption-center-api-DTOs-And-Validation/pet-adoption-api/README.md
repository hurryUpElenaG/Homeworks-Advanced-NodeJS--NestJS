## Validation Rules Choices

### Name
- Minimum length: 2 characters
- Maximum length: 50 characters

Reason:
- Prevents empty or unrealistic names.
- 50 characters is enough for long pet names while still preventing abuse or extremely large inputs.

---

### Breed
- Minimum length: 2 characters
- Maximum length: 50 characters

Reason:
- Allows realistic breed names.
- Prevents meaningless or extremely long values.

---

### Age
- Minimum: 0
- Maximum: 40

Reason:
- Pets cannot have negative ages.
- 40 years is a reasonable upper limit that still covers long-living animals such as birds or reptiles.

---

### Tags
- Maximum number of tags: 5
- Minimum tag length: 2 characters
- Maximum tag length: 20 characters
- Duplicate tags are not allowed

Reason:
- Keeps tags short and meaningful.
- Prevents spam or excessive metadata.
- Duplicate tags provide no value.

---

### Medical Notes
- Maximum length: 300 characters

Reason:
- Allows useful health information without enabling excessively large text input.

---

## Empty PATCH Bodies

Empty PATCH bodies are allowed.

Reason:
- The `PartiallyUpdatePetDto` uses NestJS `PartialType()`, which makes every field optional.
- PATCH semantics represent partial updates, so an empty object is still technically valid.
- The request succeeds but does not change any data.

---

## Postman Collection Structure

Pet Adoption API
│
├── Happy Path
│   ├── Create Pet
│   ├── Get All Pets
│   ├── Filter Pets By Species
│   ├── Filter Pets By Status
│   ├── Get Pet By ID
│   ├── Partially Update Pet
│   ├── Fully Update Pet
│   ├── Adopt Pet
│   ├── Return Pet
│   └── Delete Pet
│
└── Validation Errors
    ├── Empty Body On Create
    ├── Very Short Name
    ├── Very Long Name
    ├── Name With Digits
    ├── Name With Symbols
    ├── Invalid Species
    ├── Negative Age
    ├── Decimal Age
    ├── Too Large Age
    ├── Duplicate Tags
    ├── Empty Tag
    ├── Too Many Tags
    ├── Invalid Boolean In Medical
    ├── Invalid Date
    ├── Unknown Extra Field
    ├── Empty PATCH Body
    ├── Invalid UUID
    ├── Adopt Already Adopted Pet
    ├── Return Already Available Pet
    └── Non Existing ID
