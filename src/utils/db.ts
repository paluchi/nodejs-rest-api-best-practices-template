import aws from 'aws-sdk';
import env from '../env';

const credentials = {
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  sessionToken: env.AWS_SESSION_TOKEN,
  region: env.AWS_REGION
}

aws.config.update(credentials);

const db = new aws.DynamoDB.DocumentClient({
  endpoint: `https://dynamodb.${ env.AWS_REGION }.amazonaws.com`,
});

export const paginated_query = async (params: aws.DynamoDB.DocumentClient.QueryInput) => {
  let last_evaluated_key,
      db_params = { ...params },
      items: aws.DynamoDB.DocumentClient.ItemList = []
  while(true) {
    db_params.ExclusiveStartKey = last_evaluated_key
    const data = await db.query(db_params).promise()
    last_evaluated_key = data.LastEvaluatedKey
    items = [...items, ...(data.Items || [])]
    if (db_params.Limit || !last_evaluated_key)
      break
  }
  return items;
}

export default db;