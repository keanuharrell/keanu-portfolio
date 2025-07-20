import { createDynamoMonotable } from "../templates/dynamo";

export const sharedDatabase = createDynamoMonotable("SharedDatabase");