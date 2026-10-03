// Structural server validators generated from the same Mongoose field definitions.
const TITLE = 'gourmet_b2c_schema_v1';
function objectSchema(schema, top = false) {
  const properties = {}; const required = [];
  for (const [name, path] of Object.entries(schema.paths)) {
    if (name.includes('.')) continue;
    properties[name] = fieldSchema(path);
    if (path.isRequired || name === '_id') required.push(name);
  }
  return { bsonType: 'object', ...(top ? { title: TITLE } : {}), additionalProperties: false, properties, ...(required.length ? { required } : {}) };
}
function fieldSchema(path) {
  if (path.instance === 'Array') return { bsonType: 'array', maxItems: 100, items: path.schema ? objectSchema(path.schema) : fieldSchema(path.caster) };
  if (path.schema) return objectSchema(path.schema);
  const type = { String: 'string', Number: ['double', 'int', 'long', 'decimal'], Boolean: 'bool', Date: 'date', ObjectId: 'objectId', Map: 'object', Mixed: 'object' }[path.instance];
  const result = type ? { bsonType: type } : {};
  if (path.instance === 'String') {
    if (path.options.minlength) result.minLength = path.options.minlength;
    if (path.options.maxlength) result.maxLength = path.options.maxlength;
    if (path.options.match) result.pattern = path.options.match.source;
    if (path.enumValues?.length) result.enum = path.enumValues;
  }
  if (path.instance === 'Number') {
    if (path.options.min !== undefined) result.minimum = path.options.min;
    if (path.options.max !== undefined) result.maximum = path.options.max;
    if (path.options.validate?.validator === Number.isSafeInteger) result.multipleOf = 1;
  }
  return result;
}
module.exports = { TITLE, objectSchema };
