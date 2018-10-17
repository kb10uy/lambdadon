import { APIGatewayProxyEvent } from 'aws-lambda';
import { createHmac } from 'crypto';

export interface IGitHubCommit {
    sha: string;
    message: string;
    author: { name: string; email: string };
    url: string;
    distinct: boolean;
}

export interface IGitHubRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: any;

    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
}

export interface IGitHubPushEventPayload {
    ref: string;
    head: string;
    before: string;
    size: number;
    distinct_size: number;
    commits: IGitHubCommit[];
    repository?: IGitHubRepository;
}

export function validateGitHubRequestBody(key: string, event: APIGatewayProxyEvent) {
    if (!event.body) {
        return false;
    }

    const hmac = createHmac('sha1', key);
    const digest = hmac.update(event.body).digest('hex');
    return event.headers['X-Hub-Signature'] === `sha1=${digest}`;
}
