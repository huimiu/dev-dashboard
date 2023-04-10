import {
  AdaptiveCardInvokeResponse,
  AdaptiveCardInvokeValue,
  TeamsActivityHandler,
  TurnContext,
} from "botbuilder";
import { CommandsHelper } from "./helpers/commandHelper";

// An empty teams activity handler.
// You can add your customization code here to extend your bot logic if needed.
export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {
      await context.sendActivities([{ type: "typing" }]);
      const text = context.activity.text;
      const resp = await CommandsHelper.triggerCommand(text);
      await context.sendActivity(resp);
      await next();
    });
  }

  async onAdaptiveCardInvoke(
    context: TurnContext,
    invokeValue: AdaptiveCardInvokeValue
  ): Promise<AdaptiveCardInvokeResponse> {
    if (invokeValue.action.verb === "submit") {
      return { statusCode: 200, type: undefined, value: undefined };
    }
  }
}
