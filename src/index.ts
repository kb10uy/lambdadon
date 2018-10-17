import * as url from 'url';
import { APIGatewayProxyEvent } from 'aws-lambda';
import axios from 'axios';
import { IGitHubPushEventPayload, validateGitHubRequestBody } from './github';

const githubSecret = process.env.GITHUB_SECRET || '';
const domain = process.env.MASTODON_DOMAIN || 'http://localhost';
const accessToken = process.env.MASTODON_ACCESS_TOKEN;
const target = url.resolve(domain, '/api/v1/statuses');

export async function handle(event: APIGatewayProxyEvent) {
    if (!validateGitHubRequestBody(githubSecret, event)) {
        throw new Error('SHA1 digest did not match');
    }

    const { repository, ref } = JSON.parse(event.body || '') as IGitHubPushEventPayload;
    if (!repository) {
        throw new Error('Repository information was not found');
    }

    const result = await axios.post(
        target,
        {
            status: `[Integration] pushed at ${ref} on ${repository.full_name}`,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    return result.data;
}
