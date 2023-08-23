import { Pool } from "pg";

let conn: Pool | null = null;

// const getSecret = async () => {
//   const SecretsManager = new SecretsManagerClient({
//     region: (process.env.PGSQL_PASSWORD as string).split(":")[3],
//   });
//   const command = new GetSecretValueCommand({
//     SecretId: (process.env.PGSQL_PASSWORD as string).split(":")[6],
//   });
//   const result = await SecretsManager.send(command);
//   const secretValue = result.SecretString;
//   return secretValue;
// };

if (!conn) {
  // const secretValue = await getSecret();
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: parseInt(process.env.PGSQL_PORT ?? "5432"),
    database: process.env.PGSQL_DATABASE,
  });
}

export default conn;
