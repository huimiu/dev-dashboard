import { ApiKeyProvider, ApiKeyLocation, AxiosInstance, createApiClient } from "@microsoft/teamsfx";

export async function callOai(input: string) {
  const req = {
    prompt: `<|im_start|>system\nYou are an AI assistant that helps people find information.\n<|im_end|>\n<|im_start|>user\n${input}\n<|im_end|>\n<|im_start|>assistant`,
    max_tokens: 800,
    temperature: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 0.95,
    stop: ["<|im_end|>"],
  };
  const authProvider = new ApiKeyProvider(
    "api-key",
    process.env.TEAMSFX_API_OAI_API_KEY,
    ApiKeyLocation.Header
  );
  const apiClient: AxiosInstance = createApiClient(
    process.env.TEAMSFX_API_OAI_ENDPOINT,
    authProvider
  );
  const resp = await apiClient.post(
    "/openai/deployments/hui-gpt-35/completions?api-version=2022-12-01",
    req
  );
  const response = resp.data.choices[0].text;
  return response;
}
