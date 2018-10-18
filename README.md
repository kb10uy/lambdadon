# lambdadon

AWS Lambda function for Mastodon Integration

## Mastodon `./mastodon-action`

- push 通知をトゥートする (`MASTODON_TOOT`)
  - 必要な環境変数
    - `MASTODON_DOMAIN`
    - `MASTODON_ACCESS_TOKEN`
  - Twitter 連携のような感じでトゥートします

## AWS Action `./aws-action`

- CodeBuild を叩く (`CODEBUILD_RUN`)
  - 必要な環境変数
    - `CODEBUILD_REGION`
    - `CODEBUILD_PROJECT_NAME`
