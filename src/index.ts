import { APIGatewayProxyEvent } from 'aws-lambda';
import { validateGitHubRequestBody } from './github';
import * as mastodonAction from './mastodon-action';
import * as awsAction from './aws-action';

const githubSecret = process.env.GITHUB_SECRET || '';
const actionType = process.env.ACTION_TYPE || 'MASTODON_TOOT';

export async function handler(event: APIGatewayProxyEvent) {
    if (!validateGitHubRequestBody(githubSecret, event)) {
        throw new Error('SHA1 digest did not match');
    }

    switch (actionType) {
        case 'MASTODON_TOOT':
            return await mastodonAction.tootOnMastodon(event);
        case 'CODEBUILD_RUN':
            return await awsAction.runCodeBuild(event);
        default:
            throw new Error(`Unknown action type: ${actionType}`);
    }
}
