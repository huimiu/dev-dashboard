import { ApiKeyProvider, ApiKeyLocation, AxiosInstance, createApiClient } from "@microsoft/teamsfx";
import { BotCommand } from "./botCommand";

export class Dict extends BotCommand {
  constructor() {
    super();
  }

  isMatched(text: string): boolean {
    return text.startsWith("dict ");
  }

  async run(userInput: string): Promise<string> {
    try {
      const req = {
        prompt: `<|im_start|>system\nThe system is an AI assistant that helps people understand the meaning of some words or phrases, these words may be Chinese or English, if it is English, needs to provide Chinese meaning, the pronunciation of the word, and two or three example English sentences, there is a blank line between the three parts, only the specific content needs to be given, no explanation and title are required. If it is Chinese, needs to provide a vernacular explanation in Chinese, no example sentences are required.\n<|im_end|>\n<|im_start|>user\nThe words that need to be explained are: "${userInput.slice(
          5
        )}"\n<|im_end|>\n<|im_start|>assistant`,
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
        "/completions?api-version=2022-12-01",
        req
      );
      const response = resp.data.choices[0].text;
      return response;
    } catch (e) {
      console.log("chat error: ", e);
    }
  }
}
