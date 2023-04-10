/**
 * Adaptive Card data model. Properties can be referenced in an adaptive card via the `${var}`
 * Adaptive Card syntax.
 */
export interface NewsData {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}
