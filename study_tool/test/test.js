//const assert = require("assert");
//const Question = require("../quizBrain.js");
import * as assert from "assert";
import {Question, Quiz} from "../quizBrain.js";

/***************************************************************************/
/**** QUESTION CLASS TESTING ***********************************************/

describe("question constructor()", () => {
  let quest = new Question("riddle me this", ["apple", "banana", "cow", "dog"]);
  it("init values match those passed in", () => {
    assert.strictEqual(quest.ask, "riddle me this");
    assert.strictEqual(quest.answer, "apple");
    assert.deepStrictEqual(quest.options, ["apple", "banana", "cow", "dog"]);
  });
  it("default values are properly init", () => {
    assert.strictEqual(quest.done, false);
    assert.strictEqual(quest.attempts, 0);
  });
});

describe("question checkAnswer()", () => {
  let quest = new Question("riddle me this", ["apple", "banana", "cow", "dog"]);
  let retValue = quest.checkAnswer("apple");
  it("increments attempts by 1", () => {
    assert.strictEqual(quest.attempts, 1);
  });
  it("returns true if answer is correct", () => {
    assert.strictEqual(retValue, true);
  });
  it("if correct, done is now true", () => {
    assert.strictEqual(quest.done, true);
  });
  it("throws an error if try to re-ask done question", () => {
    assert.throws(() => quest.checkAnswer("apple"), Error);
  });
  it("throws an error if input arg is NOT type string", () => {
    assert.throws(() => quest.checkAnswer(0), TypeError);
  });

  //new question to test false answers
  let quest2 = new Question("riddle me this", ["orange", "banana", "cow", "dog"]);

  it("returns false if answer is wrong", () => {
    assert.strictEqual(quest2.checkAnswer("pea"), false);
  });
  it("increments attemps for each false answer", () => {
    assert.strictEqual(quest2.attempts, 1);
    assert.strictEqual(quest2.checkAnswer("pea"), false);
    assert.strictEqual(quest2.attempts, 2);
    assert.strictEqual(quest2.checkAnswer("0"), false);
    assert.strictEqual(quest2.attempts, 3);
  });
  it("after many false attempts, correct answer has correct attempt count, done is true and returns true", () => {
    let retValue = quest2.checkAnswer("orange");
    assert.strictEqual(retValue, true);
    assert.strictEqual(quest2.attempts, 4);
    assert.strictEqual(quest2.done, true);
  });
});

describe("question reset()", () => {
  let quest = new Question("riddle me this", ["apple", "banana", "cow", "dog"]);
  quest.checkAnswer("wrong");
  quest.checkAnswer("apple");
  quest.reset();

  it("attempts === 0 and done === false", () => {
    assert.strictEqual(quest.done, false);
    assert.strictEqual(quest.attempts, 0);
  });
});

/***************************************************************************/
/**** QUIZ CLASS TESTING ***************************************************/
describe("quiz constructor()", () => {
  let questArray = [
    new Question("riddle me this", ["apple", "banana", "cow", "dog"]),
    new Question("guess me that", ["orange", "coffee", "red", "blue"]),
  ];
  let quiz = new Quiz("Test Title", questArray, "./testImg.jpg");

  it("init values match those passed in", () => {
    assert.strictEqual(quiz.title, "Test Title");
    assert.deepStrictEqual(quiz._questList, questArray);
    assert.strictEqual(quiz._backgrndImg, "./testImg.jpg");
  });
  it("default values are properly init", () => {
    assert.strictEqual(quiz._currentQuest, 0);
    assert.strictEqual(quiz._correctCount, 0);
    assert.strictEqual(quiz._endQuiz, false);
  });
});
