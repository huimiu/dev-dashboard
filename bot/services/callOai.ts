import { ApiKeyProvider, ApiKeyLocation, AxiosInstance, createApiClient } from "@microsoft/teamsfx";

export async function callOai(input: string) {
  const req = {
    prompt: `<|im_start|>system\nYou are an AI assistant to help users summarize the news content. You need to refine the summarized content and reply in Chinese. The user will provide a news link, and you only need to reply the summarized result.\n<|im_end|>\n<|im_start|>user\n${input}\n<|im_end|>\n<|im_start|>assistant`,
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
