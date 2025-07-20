export const createDynamoMonotable = (name: string) => {
  return new sst.aws.Dynamo(name, {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
    },
    primaryIndex: { hashKey: "pk", rangeKey: "sk" },
    ttl: "ttl",
    globalIndexes: {
      "gsi1": {
        hashKey: "gsi1pk",
        rangeKey: "gsi1sk",
      },
      "gsi2": {
        hashKey: "gsi2pk", 
        rangeKey: "gsi2sk",
      }
    }
  });  
}