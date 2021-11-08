import countries from "./countries.js";

const hardCodedQuestions = {
    1: {
        alternatives: {
            1: "swe",
            2: "fra",
            3: "dnk",
            4: "bra",
        },
        correct: "swe",
    },
    2: {
        alternatives: {
            1: "blz",
            2: "fra",
            3: "cub",
            4: "cog",
        },
        correct: "fra",
    },
};

const generateQuestion = () => {
    let countriesArr = Object.keys(countries);
    const randomizeCountries = [];
    for (let i = 0; i < 54; i++) {
        let newCountries = countriesArr[Math.floor(Math.random() * 200)].toLowerCase();
        if (randomizeCountries.includes(newCountries)) {
            newCountries = countriesArr[Math.floor(Math.random() * 200)].toLowerCase();
        }
        randomizeCountries.push(newCountries);
    }
    const currentCountries = [
        randomizeCountries[0],
        randomizeCountries[1],
        randomizeCountries[2],
        randomizeCountries[3],
    ];
    const question = {};
    question.correct =
        currentCountries[Math.floor(Math.random() * currentCountries.length)];
    question.alternatives = {};
    for (let i = 1; i <= currentCountries.length; i++) {
        !currentCountries[i]
            ? (question.alternatives[i] = currentCountries[0])
            : (question.alternatives[i] = currentCountries[i]);
    }
    return question;
};

// for(let i = 1; i <= 5; i++){
// 	quizQuestions[i] = generateQuestion()
// }

export const createGame = (str) => {
    const quizQuestions = {};
    let generatedQuestions;
    for (let i = 1; i <= 5; i++) {
        quizQuestions[i] = generateQuestion();
    }
    //console.log(str);
    str == "improvedQuestions"
        ? (generatedQuestions = quizQuestions)
        : (generatedQuestions = hardCodedQuestions);
    //const generatedQuestions = hardCodedQuestions
    return {
        currentQuestion: 1,
        questions: generatedQuestions,
        score: { player1: 0, player2: 0 },
        status: "starting",
    };
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
