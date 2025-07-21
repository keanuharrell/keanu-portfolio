import { Entity, Service } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Resource } from "sst";

// Create shared client
const client = new DynamoDBClient();

// URL Entity
export const UrlEntity = new Entity({
  model: {
    entity: "Url",
    version: "1",
    service: "UrlShortener",
  },
  attributes: {
    shortCode: {
      type: "string",
      required: true,
    },
    originalUrl: {
      type: "string",
      required: true,
    },
    customSlug: {
      type: "boolean",
      default: false,
    },
    clicks: {
      type: "number",
      default: 0,
    },
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
      readOnly: true,
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["shortCode"],
      },
      sk: {
        field: "sk",
        composite: [],
      },
    },
  },
}, {
  client,
  table: Resource.SharedDynamo.name,
});

// Click Event Entity
export const ClickEntity = new Entity({
  model: {
    entity: "Click",
    version: "1",
    service: "UrlShortener",
  },
  attributes: {
    shortCode: {
      type: "string",
      required: true,
    },
    timestamp: {
      type: "string",
      required: true,
      default: () => new Date().toISOString(),
    },
    userAgent: {
      type: "string",
      required: false,
    },
    referer: {
      type: "string",
      required: false,
    },
    ip: {
      type: "string",
      required: false,
    },
    country: {
      type: "string",
      required: false,
    },
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
      readOnly: true,
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "pk",
        composite: ["shortCode"],
      },
      sk: {
        field: "sk",
        composite: ["timestamp"],
      },
    },
    byShortCode: {
      index: "gsi2",
      pk: {
        field: "gsi2pk",
        composite: ["shortCode"],
      },
      sk: {
        field: "gsi2sk",
        composite: ["createdAt"],
      },
    },
  },
}, {
  client,
  table: Resource.SharedDynamo.name,
});

// Service with entities
export const UrlService = new Service({
  url: UrlEntity,
  click: ClickEntity,
}, {
  client,
  table: Resource.SharedDynamo.name,
});