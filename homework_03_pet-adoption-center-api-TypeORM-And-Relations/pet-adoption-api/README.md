# README Documentation

## Pet Adoption Center API

This project is a NestJS REST API for managing pets, shelters, adopters, tags, medical records, and adoptions.

### Technologies

- NestJS
- TypeORM
- PostgreSQL
- DTO Validation
- Global ValidationPipe
- UUID Identifiers
- Transactions
- Soft Deletes

---

# Validation Limits

## Pet Validation

| Field | Min | Max | Reason |
|---------|---------|---------|---------|
| Name | 2 | 50 | Realistic pet names |
| Breed | 2 | 50 | Realistic breed names |
| Age | 0 | 40 | Covers long-lived pets |
| Tags Count | 0 | 10 | Prevent excessive tagging |
| Tag Length | 2 | 30 | Short descriptive labels |
| Medical Notes | 0 | 300 | Sufficient medical details |

## Shelter Validation

| Field | Min | Max | Reason |
|---------|---------|---------|---------|
| Name | 2 | 50 | Realistic shelter names |
| City | 2 | 50 | Realistic city names |
| Capacity | 1 | 1000 | Practical shelter size |

## Adopter Validation

| Field | Min | Max | Reason |
|---------|---------|---------|---------|
| Full Name | 2 | 80 | Supports full names |
| Email | Valid Email | - | Unique contact identifier |
| Phone | 7 | 20 | International formats |

---

# PATCH Requests

Empty PATCH bodies are NOT allowed.

Reason:

An empty PATCH request does not change any resource and is considered invalid input.

---

# Cascade Strategy

## Pet → MedicalRecord

Cascade Delete: YES

Reason:

Medical records only exist for a specific pet and should be removed when the pet is deleted.

## Pet ↔ Tag

Cascade Delete: NO

Reason:

Tags can belong to many pets.

Deleting a pet removes only the relationship, not the tag itself.

## Pet → Adoption

Cascade Delete: NO

Reason:

Adoption history must remain preserved for auditing and reporting purposes.

Open adoptions are closed before pet deletion.

## Shelter → Pet

Cascade Delete: NO

Reason:

Deleting a shelter containing pets would cause unintended data loss.

The API returns:

409 Conflict

until all pets are moved or removed.

---

# Eager Loading Decisions

Medical records are eagerly loaded because they are part of the core pet information.

Other relations are loaded explicitly using TypeORM relations to avoid unnecessary database queries.

---

# Soft Delete Strategy

## Soft Deleted Entities

- Pet
- Adopter

Reason:

Historical information should remain available.

## Hard Deleted Entities

- Shelter
- Tag
- MedicalRecord

Reason:

These entities do not require historical recovery in this project.

---

# Conflict Status Codes

The API uses:

409 Conflict

for business rule violations.

Examples:

- Pet already adopted
- Pet already available
- Duplicate tag name
- Duplicate adopter email
- Deleting shelter with pets

Reason:

The request is valid but conflicts with current application state.

---

# Transaction Handling

The adoption and return operations are implemented using:

DataSource.transaction()

## Adoption Transaction

1. Verify pet exists
2. Verify adopter exists
3. Verify no open adoption exists
4. Update pet status
5. Create adoption record
6. Commit transaction

If any step fails, all changes are rolled back.

## Return Transaction

1. Verify pet exists
2. Verify open adoption exists
3. Set returnedAt
4. Set pet status to available
5. Commit transaction

If any step fails, all changes are rolled back.

---

# One Open Adoption Rule

A pet may have many historical adoptions.

A pet may have only one adoption where:

returnedAt IS NULL

This rule is enforced in the service layer.

---

# PostgreSQL Configuration

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pets',
  synchronize: true,
  autoLoadEntities: true,
});
```

---

# Running The Application

Install dependencies:

```bash
npm install
```

Start PostgreSQL:

```bash
docker run \
  --name sedc-pets \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pets \
  -p 5433:5432 \
  -d postgres:16
```

Run the application:

```bash
npm run start:dev
```

---

# Homework Requirement Coverage

## Relations

- OneToOne
- OneToMany
- ManyToOne
- ManyToMany
- Explicit Join Entity

## Validation

- DTO Validation
- UUID Validation
- Global ValidationPipe
- forbidNonWhitelisted

## Persistence

- PostgreSQL
- TypeORM
- Repositories

## Transactions

- Adoption Transaction
- Return Transaction

## Soft Deletes

- Pet
- Adopter

## Business Rules

- One Open Adoption Rule
- Shelter Delete Protection
- Duplicate Email Protection
- Duplicate Tag Protection
