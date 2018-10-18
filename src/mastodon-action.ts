import * as url from 'url';
import axios from 'axios';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IGitHubPushEventPayload } from './github';

const domain = process.env.MASTODON_DOMAIN || 'http://localhost';
const accessToken = process.env.MASTODON_ACCESS_TOKEN;
const target = url.resolve(domain, '/api/v1/statuses');

/**
 * 環境変数で設定されたアカウントででトゥートする。
 * @param event API Gateway のイベントオブジェクト
 */
export async function tootOnMastodon(event: APIGatewayProxyEvent) {
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
