export const dynamo = new sst.aws.Dynamo("DynamoTable", {
  fields: {
    pk: "string",
    sk: "string",
    gsi1pk: "string",
    gsi1sk: "string",
  },
  primaryIndex: { hashKey: "pk", rangeKey: "sk" },
  globalIndexes: {
    "gsi1pk-gsi1sk-index": {
      hashKey: "gsi1pk",
      rangeKey: "gsi1sk",
    }
  }
});
