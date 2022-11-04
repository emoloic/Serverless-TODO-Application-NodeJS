import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { cors } from 'middy/middlewares'
import { createTodo } from '../../businessLogic/todos'
// import { TodosAcess } from '../../daatLayer/todosAccess';

// const todoAccess = new TodosAcess()
export const handler  = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo :  CreateTodoRequest = JSON.parse(event.body)
  const newItem = await createTodo(newTodo, event);
 
  // const newItem =  await todoAccess.createTodoItem(todoItem)
  // console.log(toDoItem)
  return {
    statusCode: 201,
    body: JSON.stringify({
      item : newItem
    })
  }
})
handler.use(
  cors({
    credentials: true
  })
)