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
      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      let text = context.activity.text;
      if (removedMentionText) {
        // Remove the line break
        text = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }
      
      const resp = await CommandsHelper.triggerCommand(text);
      await context.sendActivity(resp);
      await next();
    });
  }
}
