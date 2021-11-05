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
