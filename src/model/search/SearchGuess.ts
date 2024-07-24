import {SearchGuessItem} from "./SearchGuessItem";

export class SearchGuess {
  private _results: Array<SearchGuessItem>;


  constructor(results: Array<SearchGuessItem>) {
    this._results = results;
  }


  get results(): Array<SearchGuessItem> {
    return this._results;
  }

  set results(value: Array<SearchGuessItem>) {
    this._results = value;
  }
}
