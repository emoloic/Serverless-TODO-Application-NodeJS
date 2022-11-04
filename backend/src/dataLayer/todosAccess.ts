import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
// TODO: Implement the dataLayer logic
export class TodosAcess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todoTable = process.env.TODOS_TABLE,
    private readonly todosCreatedAtIndex = process.env.TODOS_CREATED_AT_INDEX,
    // private bucketName = process.env.ATTACHMENT_S3_BUCKET,
    // private urlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) { }

  // Create a new todo item
  async createTodoItem(todoItem: TodoItem): Promise<void> {
    await this.docClient.put({
      TableName: this.todoTable,
      Item: todoItem,
    }).promise();
    // return todoItem as TodoItem
  }
  
  async getAllTodos(userId: string): Promise<TodoItem[]> {
    const result = await this.docClient.query({
      TableName: this.todoTable,
      IndexName: this.todosCreatedAtIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    const items = result.Items

    return items as TodoItem[];
  }
  async getTodoItem(todoId: string): Promise<TodoItem> {
    const result = await this.docClient.get({
      TableName: this.todoTable,
      Key: {
        todoId
      }
    }).promise()
    const item = result.Item
    return item as TodoItem
  }
  async updateTodoItem(userId: string, todoId: string, updatedTodo: TodoUpdate) {
    return await this.docClient.update({
      TableName: this.todoTable,
      Key: {
        todoId,
        userId
      },
      UpdateExpression: "set #name = :name, #dueDate = :dueDate, #done = :done",
      ExpressionAttributeValues: {
        ":name": updatedTodo.name,
        ":dueDate": updatedTodo.dueDate,
        ":done": updatedTodo.done
      },
      ExpressionAttributeNames: {
        "#name": "name",
        "#dueDate": "dueDate",
        "#done": "done",
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
  }
  async deleteTodoItem(todoId: string, userId): Promise<string> {
    const result = await this.docClient.delete({
      TableName: this.todoTable,
      Key: {
        todoId,
        userId
      }
    }).promise()
    console.log(result)
    return "" as string
  }
}
function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }
  return new XAWS.DynamoDB.DocumentClient()
}
