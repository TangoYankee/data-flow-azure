export const {
  FLOW_DB_USER: flowDbUser,
  FLOW_DB_PASSWORD: flowDbPassword,
  FLOW_DB_NAME: flowDbName,
  FLOW_DB_PORT: flowDbPort,
  FLOW_DB_HOST: flowDbHost
} = process.env;

export const flowPsqlPgConnection = `postgresql://${flowDbUser}:${flowDbPassword}@${flowDbHost}/${flowDbName}`;
export const flowOgrPgConnection = `dbname='${flowDbName}' host='${flowDbHost}' user='${flowDbUser}' password='${flowDbPassword}' port=${flowDbPort}`

export const baseScriptsPath = "src/scripts";
