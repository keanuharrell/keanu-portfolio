import { Entity, Service } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

// URL Entity
export const UrlEntity = new Entity({
  model: {
    entity: "Url",
    version: "1",
    service: "urlshortener",
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
    userId: {
      type: "string",
      required: true,
    },
    customSlug: {
      type: "boolean",
      default: false,
    },
    isActive: {
      type: "boolean",
      default: true,
    },
    clicks: {
      type: "number",
      default: 0,
    },
    expiresAt: {
      type: "string",
    },
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
    },
    updatedAt: {
      type: "string",
      default: () => new Date().toISOString(),
      set: () => new Date().toISOString(),
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "PK",
        composite: ["shortCode"],
      },
      sk: {
        field: "SK",
        composite: [],
      },
    },
    byUser: {
      index: "GSI1",
      pk: {
        field: "GSI1PK",
        composite: ["userId"],
      },
      sk: {
        field: "GSI1SK",
        composite: ["createdAt"],
      },
    },
  },
}, { client, table: process.env.TABLE_NAME });

// Click Event Entity
export const ClickEntity = new Entity({
  model: {
    entity: "Click",
    version: "1",
    service: "urlshortener",
  },
  attributes: {
    shortCode: {
      type: "string",
      required: true,
    },
    timestamp: {
      type: "string",
      required: true,
    },
    userAgent: {
      type: "string",
    },
    referer: {
      type: "string",
    },
    ip: {
      type: "string",
    },
    country: {
      type: "string",
    },
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
    },
  },
  indexes: {
    primary: {
      pk: {
        field: "PK",
        composite: ["shortCode"],
      },
      sk: {
        field: "SK",
        composite: ["timestamp"],
      },
    },
    byDate: {
      index: "GSI2",
      pk: {
        field: "GSI2PK",
        composite: ["shortCode"],
      },
      sk: {
        field: "GSI2SK",
        composite: ["createdAt"],
      },
    },
  },
}, { client, table: process.env.TABLE_NAME });

// Create service
export const UrlService = new Service({
  url: UrlEntity,
  click: ClickEntity,
}, { client, table: process.env.TABLE_NAME });