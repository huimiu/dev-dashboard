import { BotCommand } from "../commands/botCommand";
import { DefaultChat } from "../commands/defaultChat";
import { Dict } from "../commands/dict";
import { TranslateCh } from "../commands/translateCh";
import { TranslateEn } from "../commands/translateEn";

const commands: BotCommand[] = [
  new TranslateCh(),
  new TranslateEn(),
  new Dict(),
  new DefaultChat(),
];

export class CommandsHelper {
  static async triggerCommand(userInput: string) {
    for (let command of commands) {
      if (command.isMatched(userInput)) {
        return await command.run(userInput);
      }
    }
  }
}
