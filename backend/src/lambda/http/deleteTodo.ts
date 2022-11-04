import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { APIGatewayProxyEvent,APIGatewayProxyResult } from 'aws-lambda'



import { deleteTodo } from '../../businessLogic/todos'
// import { getUserId } from '../../auth/utils'


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    // console.log("Processing Event ", event);
    
    // const userId = getUserId(event)
    await deleteTodo(todoId,event)
    // console.log(deleteData)
    return {
      statusCode: 202,
      // headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true
      // },
      body: JSON.stringify({ })
    }
  })
handler.use(httpErrorHandler())
  .use(cors({
    credentials: true
  })
)