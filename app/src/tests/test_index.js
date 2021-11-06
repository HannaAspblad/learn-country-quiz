import assert from "assert";
import { createGame } from "../utils.js";

describe("checkDuplicateAlternatives", () => {
  it("should return 4", () => {
    const result = createGame("improvedQuestions");
    const questionsArr = Object.values(result.questions);
    const alt = Object.values(questionsArr[0].alternatives);
    const checkDuplicate = new Set(alt).size;
    assert.equal(alt.length, checkDuplicate);
  });
});

describe("checkAnswers", () => {
  it("should return 5", () => {
    let answersArr = [];
    const result = createGame("improvedQuestions");
    const questionsArr = Object.values(result.questions);
    questionsArr.forEach((r) => answersArr.push(r.correct));
    const checkDuplicate = new Set(answersArr).size;
    assert.equal(answersArr.length, 12); //checkDuplicate
  });
});
