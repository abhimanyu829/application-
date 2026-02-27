import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client();

const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1').replace(/^"|"$/g, '');
const projectId = (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'dummy_project_id').replace(/^"|"$/g, '');

client
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export { ID, Query };
export default client;
