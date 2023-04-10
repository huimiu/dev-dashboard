import { ApiKeyLocation, ApiKeyProvider, AxiosInstance, createApiClient } from "@microsoft/teamsfx";
import * as configs from "../configs";
import { openAIModel } from "../models/openAIModel";

export async function askOpenAI(prompt: string): Promise<openAIModel[]> {
  const req = {
    prompt: `<|im_start|>system\nThe system is an AI assistant that helps people find information.\n<|im_end|>\n<|im_start|>user\n${prompt}\n<|im_end|>\n<|im_start|>assistant`,
    max_tokens: 800,
    temperature: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 0.95,
    stop: ["<|im_end|>"],
  };
  const authProvider = new ApiKeyProvider(
    "api-key",
    process.env.TEAMSFX_API_OAI_API_KEY!,
    ApiKeyLocation.Header
  );
  const apiClient: AxiosInstance = createApiClient(
    process.env.TEAMSFX_API_OAI_ENDPOINT!,
    authProvider
  );
  const resp = await apiClient.post(
    "/openai/deployments/hui-gpt-35/completions?api-version=2022-12-01",
    req
  );

  const result: openAIModel[] = [];
  for (const obj of resp.data.choices) {
    result.push(...splitText(obj["text"]!));
  }

  return result;
}

function splitText(text: string): openAIModel[] {
  const result: openAIModel[] = [];
  let index = 0;
  while (index < text.length) {
    // split <code></code> from text in cycles
    const codeStart = text.indexOf("<code>", index);
    const codeEnd = text.indexOf("</code>", index);
    if (codeStart === -1 || codeEnd === -1) {
      if (index == 0) {
        result.push({ text: text, isCode: false });
      }
      // no more code blocks
      break;
    }
    const textModel: openAIModel = {
      text: text.substring(index, codeStart),
      isCode: false,
    };
    result.push(textModel);

    const code = text.substring(codeStart + 6, codeEnd);
    const codeModel: openAIModel = {
      text: code,
      isCode: true,
    };
    result.push(codeModel);
    index = codeEnd + 7;
  }
  return result;
}

export async function textCompletion(text: string): Promise<string> {
  try {
    const req = {
      prompt: `<|im_start|>system\nThe system is an AI assistant that helps people find information.\n<|im_end|>\n<|im_start|>user\n${text}\n<|im_end|>\n<|im_start|>assistant`,
      max_tokens: 800,
      temperature: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: ["<|im_end|>"],
    };

    const resp = await fetch(
      `https://hui-oai-instance.openai.azure.com/openai/deployments/hui-gpt-35/completions?api-version=2022-12-01`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8;",
          "api-key": configs.OPENAPI_KEY,
        },
        body: JSON.stringify(req),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
    return resp.choices[0].text;
  } catch (e) {
    console.log(e);
    return '';
  }
}
