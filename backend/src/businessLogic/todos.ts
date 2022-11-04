import { TodoItem } from "../models/TodoItem";
import { getUserId } from "../auth/utils";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodosAcess } from "../dataLayer/todosAccess";
import { TodoStorage } from "../fileStroage/attachmentUtils";
import * as uuid from 'uuid';
import { APIGatewayProxyEvent } from "aws-lambda";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoUpdate } from "../models/TodoUpdate";
const todoAccess = new TodosAcess()
const todoStorage = new TodoStorage()

export async function createTodo(createTodoRequest: CreateTodoRequest,event: APIGatewayProxyEvent): Promise<TodoItem>{
//   const newTodo :  CreateTodoRequest = JSON.parse(event.body)
  const bucketName = process.env.ATTACHMENT_S3_BUCKET
  const itemId = uuid.v4()
  const userId = getUserId(event)
   const newItem: TodoItem={
        userId: userId,
        todoId: itemId,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${itemId}`,
        ... createTodoRequest 
   }
  await todoAccess.createTodoItem(newItem)
  return newItem as TodoItem;
}

export async function updateTodo(todoId:string,updatedTodo: UpdateTodoRequest,event: APIGatewayProxyEvent){
    const userId = getUserId(event)
  return await todoAccess.updateTodoItem(userId,todoId,updatedTodo as TodoUpdate )
}

export async function getAllTodos(event: APIGatewayProxyEvent): Promise<TodoItem[]> {
  const userId = getUserId(event)
  const todos = await todoAccess.getAllTodos(userId)
  return todos;
}
export async function deleteTodo(todoId: string, event: APIGatewayProxyEvent):Promise<string> {
  const userId = getUserId(event)
 return todoAccess.deleteTodoItem(todoId,userId)
}

export function generateUploadUrl(todoId: string): Promise<string> {
    return todoStorage.getUploadUrl(todoId);
}