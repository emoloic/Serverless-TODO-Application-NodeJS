import 'source-map-support/register'
import { generateUploadUrl } from '../../businessLogic/todos'
import {APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as uuid from 'uuid'
// import { getUserId } from "../../auth/utils";
import * as middy from 'middy'

import { cors } from 'middy/middlewares'
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  // const userId = getUserId(event)


  const todoId = event.pathParameters.todoId
  const url = await generateUploadUrl(todoId)
    return {
      statusCode: 202,
      body: JSON.stringify({
        uploadUrl: url
  })
    };
  })
handler.use(
  cors({
    credentials: true
  })
)


