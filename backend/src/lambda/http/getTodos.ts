import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors} from 'middy/middlewares'

import { getAllTodos } from '../../businessLogic/todos'

// TODO: Get all TODO items for a current user
export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    // Additional information stored with a log statement
    const todos = await getAllTodos(event);

    return {
      statusCode: 201,
      body: JSON.stringify({
      items : todos
    }),
    }
})
handler.use(
  cors({
    credentials: true
  })
)

