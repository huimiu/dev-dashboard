export type PredicateFunc<T> = (v: T) => boolean;
export type MatchTerm = string | RegExp | PredicateFunc<string>;

export abstract class BotCommand {
  abstract isMatched(text: string): boolean;

  abstract run(userInput: string): Promise<string>;
}
