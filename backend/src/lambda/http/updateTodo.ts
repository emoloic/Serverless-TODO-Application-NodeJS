import 'source-map-support/register'

import { APIGatewayProxyEvent,APIGatewayProxyResult } from 'aws-lambda'

import { updateTodo} from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
// import { getUserId } from '../../auth/utils'

export const handler = middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Processing event", event);
  // const userId = getUserId(event);
  const todoId = event.pathParameters.todoId;
  const updatedTodo : UpdateTodoRequest = JSON.parse(event.body)
  const newItem = await updateTodo(todoId,updatedTodo,event);
  return {
    statusCode: 200,
    // headers: {
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true
    // },
    body: JSON.stringify({
       newItem
    })
  }
})
handler.use(httpErrorHandler())
  .use(
  cors({
    credentials: true
  })
)