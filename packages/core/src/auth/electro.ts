import { Entity } from "electrodb";
import { Resource } from "sst";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB();

export const UserElectro = new Entity({
  model: {
    version: "1",
    entity: "User",
    service: "AuthService",
  },
  attributes: {
    id: { 
      type: "string", 
      required: true,
      readOnly: true,
      default: () => crypto.randomUUID(),
    },
    email: { 
      type: "string", 
      required: true,
      validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    name: { 
      type: "string", 
      required: false,
    },
    pictureUrl: { 
      type: "string", 
      required: false, 
    },
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
      readOnly: true
    },
    updatedAt: {
      type: "string",
      watch: "*",
      set: () => new Date().toISOString(),
      readOnly: true
    }
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["id"]
      },
      sk: {
        field: "sk", 
        composite: []
      }
    },
    byEmail: {
      index: "gsi1",
      pk: {
        field: "gsi1pk",
        composite: ["email"],
      },
      sk: {
        field: "gsi1sk",
        composite: []
      }
    },
  },
}, {
  client, 
  table: Resource.SharedDynamo.name,
}
);