import { ApiKeyProvider, ApiKeyLocation, AxiosInstance, createApiClient } from "@microsoft/teamsfx";
import { BotCommand } from "./botCommand";

export class TranslateCh extends BotCommand {
  constructor() {
    super();
  }

  isMatched(text: string): boolean {
    return text.startsWith("ch-en ");
  }

  async run(userInput: string): Promise<string> {
    try {
      const req = {
        prompt: `<|im_start|>system\nThe system is an AI assistant that helps people translate Chinese to Enghlish, needs provide professional English translation results and not need to return redundant explanations.\n<|im_end|>\n<|im_start|>user\n"${userInput.slice(6)}"\n<|im_end|>\n<|im_start|>assistant`,
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
