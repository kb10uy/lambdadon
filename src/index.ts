import { APIGatewayProxyEvent } from 'aws-lambda';
import axios from 'axios';
import { createHmac } from 'crypto';

const githubSecret = process.env.GITHUB_SECRET || '';

export async function handle(event: APIGatewayProxyEvent) {
  if (!validateRequestBody(githubSecret, event)) {
    throw new Error('SHA1 digest did not match');
  }
}

function validateRequestBody(key: string, event: APIGatewayProxyEvent) {
  if (!event.body) {
    return false;
  }

  const hmac = createHmac('sha1', key);
  const digest = hmac.update(event.body).digest('hex');
  return event.headers['X-Hub-Signature'] === `sha1=${digest}`;
}
