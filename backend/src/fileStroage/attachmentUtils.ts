import * as AWS from 'aws-sdk'
const AWSXRay = require ('aws-xray-sdk')
import { Types } from 'aws-sdk/clients/s3';

//  import { url } from 'inspector';

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

export class TodoStorage{
    constructor(
        private readonly s3: Types = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
    ) { }
    async getUploadUrl(todoId: string): Promise<string>{
       const url = this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: parseInt(this.urlExpiration)
        })
        console.log(url)
        return url as string
    }
}