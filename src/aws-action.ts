import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';

// Lambda がセットする環境変数を aws-sdk が自動で読み込む

export async function runCodeBuild(event: APIGatewayProxyEvent) {
    const codeBuild = new AWS.CodeBuild({
        region: process.env.CODEBUILD_REGION || 'us-east-1',
    });

    const result = await codeBuild
        .startBuild({
            projectName: process.env.CODEBUILD_PROJECT_NAME || '',
        })
        .promise();

    return result.$response.data;
}
