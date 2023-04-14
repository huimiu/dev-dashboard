import * as axios from "axios";

import {
  BearerTokenAuthProvider,
  createApiClient,
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";

const authConfig: TeamsUserCredentialAuthConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID!,
  initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL!,
};

const credential = new TeamsUserCredential(authConfig);
const apiBaseUrl = process.env.REACT_APP_FUNC_ENDPOINT! + "/api/";

const apiClient = createApiClient(
  apiBaseUrl,
  new BearerTokenAuthProvider(async () => (await credential.getToken(""))!.token)
);

export async function callFunction(
  functionName: string,
  method: axios.Method,
  params?: any,
  data?: any
) {
  try {
    const response = await apiClient.request({
      url: functionName,
      method,
      params,
      data,
    });
    return response.data;
  } catch (err: any) {
    console.error(err);
    return err?.message;
  }
}
