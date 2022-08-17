export class Question {
  constructor(ask, options) {
    this._ask = ask;
    this._answer = options[0];
    this._options = options;
    this._done = false;
    this._attempts = 0;
  }
  get ask() {
    return this._ask;
  }
  get answer() {
    return this._answer;
  }
  get options() {
    return this._options;
  }
  get done() {
    return this._done;
  }
  get attempts() {
    return this._attempts;
  }
  checkAnswer(answer) {
    if (typeof answer !== "string") throw new TypeError("Answer parameter must be of type string");
    else if (!this._done) {
      ++this._attempts;
      if (answer === this._answer) {
        this._done = true;
        return true;
      }
      return false;
    } else throw new Error("Question already properly answered");
  }
  reset() {
    this._done = false;
    this._attempts = 0;
  }
}

export class Quiz {
  constructor(title, questList, backgrndImg) {
    this._title = title;
    this._questList = questList;
    this._backgrndImg = backgrndImg;
    this._currentQuest = 0;
    this._correctCount = 0;
    this._endQuiz = false;
  }
  get title() {
    return this._title;
  }
  /*
  get questList() {
    return this._questList;
  }
  get backgrndImg() {
    return this._backgrndImg;
  }
  get currentQuest() {
    return this._currentQuest;
  }
  get correctCount() {
    return this._correctCount;
  }
  get endQuiz() {
    return this._endQuiz;
  }*/
}

