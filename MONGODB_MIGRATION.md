# MongoDB Migration Guide

All entities have been converted from TypeORM to Mongoose schemas. The following changes were made:

## Key Changes

1. **Package.json**: Replaced `@nestjs/typeorm`, `typeorm`, and `pg` with `@nestjs/mongoose` and `mongoose`
2. **Database Config**: Changed from TypeORM config to MongoDB connection string
3. **Entities**: Converted from TypeORM decorators to Mongoose schemas with `@Prop()` and `@Schema()`
4. **Services**: Replaced `@InjectRepository` with `@InjectModel` and TypeORM queries with Mongoose queries
5. **Modules**: Replaced `TypeOrmModule.forFeature()` with `MongooseModule.forFeature()`

## Remaining Updates Needed

All services and modules need to be updated to use Mongoose. The pattern is:

### Service Pattern:
```typescript
// Before (TypeORM)
@InjectRepository(Entity)
private entityRepository: Repository<Entity>

// After (Mongoose)
@InjectModel(Entity.name)
private entityModel: Model<EntityDocument>
```

### Query Pattern:
```typescript
// Before (TypeORM)
await this.repository.findOne({ where: { id } })

// After (Mongoose)
await this.model.findById(id).exec()
```

### Module Pattern:
```typescript
// Before (TypeORM)
TypeOrmModule.forFeature([Entity])

// After (Mongoose)
MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }])
```

