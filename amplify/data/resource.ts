import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    }),
  
   //Create the joining table for the many to many relationship that connects messages to visits
VisitMessage: a.model({
//Create the joining fields
      visitId: a.id(),//.required(),
      messageId: a.id(),//.required(),
//Create the relationships
     visit: a.belongsTo('Visit', 'vId'),
     message: a.belongsTo('Message', 'mId'),
      }),
//Create a table called Visit to hold data for each instance of a visit
Visit: a.model({
//Create fields in the Visit table 
     vId: a.id().required(),
     fName: a.string().required(),
     lName: a.string().required(),
     carReg: a.string().required(),
     vDate: a.integer().required(),
     vTime: a.float().required(),
     passReturned: a.boolean(),
  
//Add relationship to 
      messages: a.hasMany('VisitMessage', 'vId'),
    }),
//.identifier(["vId"]),
//Create the message table to hold the text of any messages sent to people
Message: a.model({
//Create the fields in the messages table
      mId: a.id().required(),
      mContent: a.string().required(),
      mCreateDate: a.integer().required(),
      mCreateTime: a.float().required(),
      visits: a.hasMany('VisitMessage', 'mId'),
      }),
}).authorization((allow) => [allow.publicApiKey()]);
//  .identifier(["mId"])

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
