import React, { useState, useEffect } from "react";
import * as R from "ramda";
import { Link, Route, Router, useLocation } from "wouter";
import { customAlphabet } from "nanoid";
import "./App.css";
import * as utils from "./utils";
import countries from "./countries";
import winning from "../assets/winning.png";
import dog from "../assets/dog.png";
import tie from "../assets/tie.png";
import cookieImg from '../assets/cookie.png'
import { useCookies } from "react-cookie";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { ref, getDatabase, set, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvxyz", 5);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAD-Z1ea25xGnz0zOj52_ZLLmJFjerSkyQ",
    authDomain: "learn-country-quiz-9a68d.firebaseapp.com",
    databaseURL:
        "https://learn-country-quiz-9a68d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "learn-country-quiz-9a68d",
    storageBucket: "learn-country-quiz-9a68d.appspot.com",
    messagingSenderId: "566432498691",
    appId: "1:566432498691:web:8de7b8e94e66b2ad8bba36",
    measurementId: "G-P0R7DLCGR4",
};

let analyticsCookies = false
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics
//const analytics = getAnalytics(app);

const db = getDatabase(app);
function App() {
    const [showCookieBanner, setShowCookieBanner] = useState(true)
	const [cookies, setCookie] = useCookies(["user"]);

	useEffect(() => {
		//analyticsCookies ? analytics = getAnalytics(app) : analytics = null;
		if(cookies){
			if(cookies.cookiesConsent){
				setShowCookieBanner(false)
				if(cookies.cookiesConsent.setting == 'All'){
					analyticsCookies = true
					analyticsCookies ? analytics = getAnalytics(app) : analytics = null;
					//location.reload()
				} else {
					analyticsCookies = false
				}
			}		
		}
	}, [showCookieBanner])

    return (
        <div className="app">
            <div className="header">THE FLAG GAME</div>
            <div className="middle">
                <Route path="/">
                    <StartPage />
					{showCookieBanner && (
                    <Cookies showBanner={() => setShowCookieBanner(!showCookieBanner)} />
                )}
                </Route>
                <Route path="/game/:gameId/:playerId">
                    {(params) => {
                        return (
                            <GamePage gameId={params.gameId} playerId={params.playerId} />
                        );
                    }}
                </Route>
                <Route path="/setup">
                    <Setup />
                </Route>
                <Route path="/setup-advanced">
                    <SetupAdvanced />
                </Route>
				<Route path="/cookies">
                    <HelloWorld />
                </Route>
            </div>
            <div className="footer"> </div>
			
        </div>
    );
}

const StartPage = () => {
    const [snapshot, loading, error] = useObject(ref(db, "nextGame"));
    const [location, setLocation] = useLocation();
    let countriesArr = Object.keys(countries);
    const randomizeCountries = [];

    for (let i = 0; i < 54; i++) {
        let newCountries = countriesArr[Math.floor(Math.random() * 200)];
        if (randomizeCountries.includes(newCountries)) {
            newCountries = countriesArr[Math.floor(Math.random() * 200)];
        }
        randomizeCountries.push(newCountries);
    }

    if (loading) return <div className="fw6 fs5">Loading...</div>;
    const nextGame = snapshot.val();
    const play = async () => {
        if (R.isNil(nextGame)) {
            const updates = {};
            const gameId = nanoid();
            updates["/nextGame"] = gameId;
            await update(ref(db), updates);
            setLocation(`/game/${gameId}/1`);
        } else {
			if(analyticsCookies){
				logEvent(analytics, "game_started");
			}
            let game = null;
            if (JSON.parse(localStorage.getItem("improvedQuestions"))) {
                game = utils.createGame("improvedQuestions");
            } else {
                game = utils.createGame("standardQuestion");
            }
            const updates = {};
            updates["/nextGame"] = null;
            updates[`/games/${nextGame}`] = game;
            await update(ref(db), updates);
            setLocation(`/game/${nextGame}/2`);

            await utils.sleep(3000);
            const updates2 = {};
            updates2[`/games/${nextGame}/status`] = "playing";
            await update(ref(db), updates2);
        }
    };
    return (
        <div className="page">
            {!JSON.parse(localStorage.getItem("improvedFlagging")) ? (
                <div className="st-flags">
                    <div className="f32">
                        <div className={`flag swe`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bih`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag brb`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag swe`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bgd`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bel`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bfa`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bgr`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bhr`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bdi`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag ben`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bmu`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag brn`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bol`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bra`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bhs`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag btn`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag fra`}></div>
                    </div>
                    <div className="f32">
                        <div className={`flag bwa`}></div>
                    </div>
                </div>
            ) : (
                <div className="f32">
                    {randomizeCountries.map((country, i) => (
                        <div key={i} className={`flag ${country.toLowerCase()}`}></div>
                    ))}
                </div>
            )}
            <div className="button btn-square" onClick={play}>
                Play
            </div>
        </div>
    );
};

const GamePage = ({ gameId, playerId }) => {
    const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`));
    const [location, setLocation] = useLocation();

    if (loading) return <div className="fw6 fs5">Loading...</div>;
    const game = snapshot.val();

    const cancel = async () => {
		if(analyticsCookies){
			logEvent(analytics, "cancelled_game");
		}        
        const updates = {};
        updates["/nextGame"] = null;
        await update(ref(db), updates);
        setLocation(`/`);
    };

    if (game && game.status === "playing")
        return <QuestionPage gameId={gameId} playerId={playerId} />;
    if (game && game.status === "finished")
        return <ResultsPage gameId={gameId} playerId={playerId} />;

    return (
        <div className="page">
            <div className="fw6 fs9 tac">
                {!game && "Waiting for opponent..."}
                {game && game.status === "starting" && "Starting game... Get READY!"}
            </div>
            {!game && (
                <div className="link" style={{ marginTop: "10rem" }} onClick={cancel}>
                    Cancel
                </div>
            )}
        </div>
    );
};

const QuestionPage = ({ gameId, playerId }) => {
    const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`));
    const [improvedScoring, setImprovedScoring] = useState(
        JSON.parse(localStorage.getItem("improvedScoring"))
    );

    if (loading) return <div className="fw6 fs5">Loading...</div>;
    const game = snapshot.val();

    const youKey = `player${playerId}`;
    const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`;

    const question = game.questions[`${game.currentQuestion}`];

    if (!question) return "Loading...";
    const answer = async (countryCode) => {
        if (question.fastest) return;

        const updates = {};
        updates[`/games/${gameId}/questions/${game.currentQuestion}/fastest`] = {
            player: playerId,
            answer: countryCode,
        };
        if (countryCode == question.correct) {
            updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] + 1;
        } else if (countryCode !== question.correct && improvedScoring == true) {
            updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] - 1;
        }
        await update(ref(db), updates);

        if (game.currentQuestion < Object.values(game.questions).length) {
            await utils.sleep(3000);
            const updates2 = {};
            updates2[`/games/${gameId}/currentQuestion`] =
                parseInt(game.currentQuestion) + 1;
            await update(ref(db), updates2);
        } else {
            await utils.sleep(3000);
            const updates2 = {};
            updates2[`/games/${gameId}/status`] = "finished";
            await update(ref(db), updates2);
        }
    };

    return (
        <div className="page">
            <div className="f32">
                <div className={`flag ${question.correct}`}></div>
            </div>
            <div className="alternatives">
                {Object.entries(question.alternatives).map(([k, countryCode]) => {
                    let correct = null;
                    let youOrOpponent = false;
                    if (question.fastest && question.fastest.answer == countryCode) {
                        correct = question.fastest.answer === question.correct;
                        if (question.fastest.player === playerId) {
                            youOrOpponent = `YOU ${correct ? " +1" : ""}`;
                        } else {
                            youOrOpponent = `OPPONENT ${correct ? " +1" : ""}`;
                        }
                    }
                    return (
                        <div
                            className={`button alt ${correct && "alt-green"} ${
                                correct === false && "alt-red"
                            }`}
                            key={countryCode}
                            title={countryCode}
                            onClick={() => answer(countryCode)}
                        >
                            {countries[countryCode.toUpperCase()]}
                            {}
                            {youOrOpponent && (
                                <div className="alt-label">{youOrOpponent}</div>
                            )}
                        </div>
                    );
                })}
            </div>
            {question.fastest && (
                <div className="fs7 fw5 m9">Get ready for the next question...</div>
            )}
            {question.fastest && (
                <QuickResults
                    you={game.score[youKey]}
                    opponent={game.score[opponentKey]}
                />
            )}
        </div>
    );
};

const QuickResults = ({ you, opponent }) => {
    return (
        <div className="quick-results">
            YOU {you} - {opponent} OPPONENT
        </div>
    );
};

const ResultsPage = ({ gameId, playerId }) => {
	if(analyticsCookies){
		logEvent(analytics, "finished_game");
	}
    const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`));

    if (loading) return <div className="fw6 fs5">Loading...</div>;
    const game = snapshot.val();

    const youKey = `player${playerId}`;
    const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`;

    const youWon = game.score[youKey] > game.score[opponentKey];
    const youLost = game.score[youKey] < game.score[opponentKey];
    const tie = game.score[youKey] === game.score[opponentKey];
    return (
        <div className="page">
            {youWon && (
                <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />
            )}
            {youLost && (
                <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />
            )}
            {tie && JSON.parse(localStorage.getItem("improvedResult")) && (
                <Tie you={game.score[youKey]} opponent={game.score[opponentKey]} />
            )}
            {tie && !JSON.parse(localStorage.getItem("improvedResult")) && (
                <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />
            )}

            <Link href="/" className="re-home link">
                Home
            </Link>
        </div>
    );
};

const Won = ({ you, opponent }) => {
    return (
        <div className="results">
            <img src={winning} style={{ width: "80%" }} />
            <div className="re-text">Congratulations!!</div>
            <QuickResults you={you} opponent={opponent} />
        </div>
    );
};

const Lost = ({ you, opponent }) => {
    return (
        <div className="results">
            <img src={dog} style={{ width: "80%" }} />
            <div className="re-text">Better luck next time...</div>
            <QuickResults you={you} opponent={opponent} />
        </div>
    );
};

const Tie = ({ you, opponent }) => {
    return (
        <div className="results">
            <img src={tie} style={{ width: "80%" }} />
            <div className="re-text">It's a TIE! 😁 </div>
            <QuickResults you={you} opponent={opponent} />
        </div>
    );
};


const Cookies = (props) => {
    const [cookies, setCookie] = useCookies(["user"]);
	const [showButtonBasic, setShowButtonBasic] = useState(true)

	const acceptAllCookies = async () => {
		console.log('all')
        props.showBanner();
        setCookie(
            "cookiesConsent",
            { user: "AI", date: Date(), setting: "All", method: "Pushed_Allow" }
        );
		location.reload()
    };

	const acceptBasicCookies = async () => {
		props.showBanner();
		setCookie(
            "cookiesConsent",
            { user: "AI", date: Date(), setting: "Basic", method: "Pushed_Allow" }
        );
	}

	const dismiss = async (e) => {
		console.log(e.target)
		e.preventDefault();
		//props.showBanner();
		setCookie(
            "cookiesConsent",
            { user: "AI", date: Date(), setting: "Basic", method: "Dismiss" }
        );
	}


    return (
        <div className="cookie-banner-backdrop">
			<div className="cookie-content">
				{<img src={cookieImg} />}
            	<h2>Our website uses cookies</h2>
				<p>We use necessary cookies to make our site work. We'd also like to set analytics cookies that help us make improvements by measuring how you use the site. These will be set only if you accept.</p>
				<p>For more detailed information about the cookies we use, <a target="_blank" href="/cookies" className="link cookies-link">
				see our Cookies page.
                </a></p>
				
				<div className="cookie-options">
					<div>
						<input type="checkbox" checked="checked" readOnly/> 
						<label><strong>Nessesary cookies</strong><br/> helps with the basic functionality of our website, e.g. remember if you gave consent to cookies.</label>
					</div>
					<div>
						<input type="checkbox" checked={showButtonBasic} onChange={() => setShowButtonBasic(!showButtonBasic)}/> 
						<label><strong>Analytical cookies</strong><br/> make it possible to gather statistics about the use and traffic on our website, so we can make it better.</label>
					</div>
				</div>
			
				<div className="cookie-buttons">
					{!showButtonBasic && <button onClick={acceptBasicCookies}>Accept nessesary</button>}
            		{showButtonBasic && <button onClick={acceptAllCookies} className="accept-all" >Accept all</button>}
				</div>
			</div>
        </div>
    );
};

const HelloWorld = () => { //byt namn

	return (
		<div className="cookie-page-wrapper">
			<h1>Cookies</h1>
			<h2>Use of cookies by The Flag Game</h2>
			<p>Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site. The table below explains the cookies we use and why.</p>
			<div className="cookie-grid-container">
				 <div className="cookie-grid-item">Cookie</div>
				<div className="cookie-grid-item">Name</div>
				<div className="cookie-grid-item">Purpose</div>
				<div className="cookie-grid-item"><p>Cookie preference</p></div>
				<div className="cookie-grid-item"><p>cookiesConsent</p></div>
				<div className="cookie-grid-item"><p>This cookie is used to remember a user’s choice about cookies on The Flag Game. Where users have previously indicated a preference, that user’s preference will be stored in this cookie.</p></div>
			</div>
			<div className="cookie-page-footer" style={{ marginTop: "20%" }}>
                <Link href="/" className="re-home link">
                    Go to app!
                </Link>
            </div>
		</div>
	)
}

const Setup = () => {
    const [questionBtn, setQuestionBtn] = useState(
        JSON.parse(localStorage.getItem("improvedQuestions"))
    );
    const [scoringBtn, setScoringBtn] = useState(
        JSON.parse(localStorage.getItem("improvedScoring"))
    );
    const [tieScreenBtn, setTieScreenBtn] = useState(
        JSON.parse(localStorage.getItem("improvedResult"))
    );
    const [extraFlagsBtn, setExtraFlagsBtn] = useState(
        JSON.parse(localStorage.getItem("improvedFlagging"))
    );

    const changeQuestionState = () => {
        setQuestionBtn(!questionBtn);
        localStorage.setItem(
            "improvedQuestions",
            !JSON.parse(localStorage.getItem("improvedQuestions"))
        );
    };

    const changeScoringState = () => {
        setScoringBtn(!scoringBtn);
        localStorage.setItem(
            "improvedScoring",
            !JSON.parse(localStorage.getItem("improvedScoring"))
        );
    };
    const changeTieScreenState = () => {
        setTieScreenBtn(!tieScreenBtn);
        localStorage.setItem(
            "improvedResult",
            !JSON.parse(localStorage.getItem("improvedResult"))
        );
    };
    const changeExtraFlagsState = () => {
        setExtraFlagsBtn(!extraFlagsBtn);
        localStorage.setItem(
            "improvedFlagging",
            !JSON.parse(localStorage.getItem("improvedFlagging"))
        );
    };

    return (
        <div
            className="setup-switch"
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
            <div
                className="improved-scoring"
                style={{
                    display: "flex",
                    width: "500px",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ margin: 0 }}>Improved scoring: </h3>
                <div
                    style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        width: "100px",
                    }}
                >
                    <button
                        onClick={() => changeScoringState()}
                        style={
                            scoringBtn
                                ? {
                                      padding: "3px 10px",
                                      position: "relative",
                                      left: "40px",
                                      backgroundColor: "rgba(123, 239, 178, 1)",
                                      borderRadius: "5px",
                                      border: "none",
                                  }
                                : {
                                      padding: "3px 10px",
                                      border: "none",
                                      position: "relative",
                                      right: 0,
                                      backgroundColor: "rgba(255, 99, 71, 0.9)",
                                      borderRadius: "5px",
                                  }
                        }
                    >
                        {scoringBtn ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
            <div
                className="tie-screen"
                style={{
                    display: "flex",
                    width: "500px",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ margin: 0 }}>Tie Screen</h3>
                <div
                    style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        width: "100px",
                    }}
                >
                    <button
                        onClick={changeTieScreenState}
                        style={
                            tieScreenBtn
                                ? {
                                      padding: "3px 10px",
                                      position: "relative",
                                      left: "40px",
                                      backgroundColor: "rgba(123, 239, 178, 1)",
                                      borderRadius: "5px",
                                      border: "none",
                                  }
                                : {
                                      padding: "3px 10px",
                                      border: "none",
                                      position: "relative",
                                      right: 0,
                                      backgroundColor: "rgba(255, 99, 71, 0.9)",
                                      borderRadius: "5px",
                                  }
                        }
                    >
                        {tieScreenBtn ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
            <div
                className="extra-flags"
                style={{
                    display: "flex",
                    width: "500px",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ margin: 0 }}>Extra Flags</h3>
                <div
                    style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        width: "100px",
                    }}
                >
                    <button
                        onClick={changeExtraFlagsState}
                        style={
                            extraFlagsBtn
                                ? {
                                      padding: "3px 10px",
                                      position: "relative",
                                      left: "40px",
                                      backgroundColor: "rgba(123, 239, 178, 1)",
                                      borderRadius: "5px",
                                      border: "none",
                                  }
                                : {
                                      padding: "3px 10px",
                                      border: "none",
                                      position: "relative",
                                      right: 0,
                                      backgroundColor: "rgba(255, 99, 71, 0.9)",
                                      borderRadius: "5px",
                                  }
                        }
                    >
                        {extraFlagsBtn ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
            <div
                className="extra-questions"
                style={{
                    display: "flex",
                    width: "500px",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ margin: 0 }}>Generated questions</h3>
                <div
                    style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        width: "100px",
                    }}
                >
                    <button
                        onClick={changeQuestionState}
                        style={
                            questionBtn
                                ? {
                                      padding: "3px 10px",
                                      position: "relative",
                                      left: "40px",
                                      backgroundColor: "rgba(123, 239, 178, 1)",
                                      borderRadius: "5px",
                                      border: "none",
                                  }
                                : {
                                      padding: "3px 10px",
                                      border: "none",
                                      position: "relative",
                                      right: 0,
                                      backgroundColor: "rgba(255, 99, 71, 0.9)",
                                      borderRadius: "5px",
                                  }
                        }
                    >
                        {questionBtn ? "ON" : "OFF"}
                    </button>
                </div>
            </div>
            <div className="setup-footer" style={{ marginTop: "20%" }}>
                <Link href="/" className="re-home link">
                    Go to app!
                </Link>
            </div>
        </div>
    );
};

const SetupAdvanced = () => {
    const [snapshot, loading, error] = useObject(ref(db, "profiles"));
    //Grids
    const [gridAlpha, setGridAlpha] = useState(false);
    const [gridBeta, setGridBeta] = useState(false);
    const [gridPilots, setGridPilots] = useState(false);
    const [gridRest, setGridRest] = useState(false);
    //latestGames
    //const [LGAlpha, setLGAlpha] = useState(false);
	const [LGAlpha, setLGAlpha] = useState(false);
    const [LGBeta, setLGBeta] = useState(false);
    const [LGPilots, setLGPilots] = useState(false);
    const [LGRest, setLGRest] = useState(false);
    //countdown
    const [countdownAlpha, setCountdownAlpha] = useState(false);
    const [countdownBeta, setCountdownBeta] = useState(false);
    const [countdownPilots, setCountdownPilots] = useState(false);
    const [countdownRest, setCountdownRest] = useState(false);
    //numQuestions
    const [numQuestionsAlpha, setNumQuestionsAlpha] = useState(false);
    const [numQuestionsBeta, setNumQuestionsBeta] = useState(false);
    const [numQuestionsPilots, setNumQuestionsPilots] = useState(false);
    const [numQuestionsRest, setNumQuestionsRest] = useState(false);
    useEffect(() => {
        if (!loading) {
            setGridAlpha(snapshot.val().alpha.grid);
            setGridBeta(snapshot.val().beta.grid);
            setGridPilots(snapshot.val().pilots.grid);
            setGridRest(snapshot.val().rest.grid);
            /* setLGAlpha(snapshot.val().alpha.latestGames);
            setLGBeta(snapshot.val().beta.latestGame);
            setLGPilots(snapshot.val().pilots.latestGame);
            setLGRest(snapshot.val().rest.latestGame); */
        }
    }, [snapshot]);

	const changeAlpha = (str, value) => {
		console.log(LGAlpha)
		const newUpdate = {
			grid: gridAlpha,
			latestGames: LGAlpha,
			countdown: countdownAlpha,
			numQuestions: numQuestionsAlpha
		}
		newUpdate[str] = value
		console.log(newUpdate)
		update(ref(db, "profiles"), {alpha: newUpdate})
	}

    const changeGridAlpha = () => {
        setGridAlpha(!gridAlpha);
        /* update(ref(db, "profiles"), {
            alpha: { grid: !gridAlpha },
        }); */
		changeAlpha('countdown', !countdownAlpha)
    };
    const changeGridBeta = () => {
        setGridBeta(!gridBeta);
        update(ref(db, "profiles"), {
            beta: { grid: !gridBeta },
        });
    };
    const changeGridPilots = () => {
        setGridPilots(!gridPilots);
        update(ref(db, "profiles"), {
            pilots: { grid: !gridPilots },
        });
    };
    const changeGridRest = () => {
        setGridRest(!gridRest);
        update(ref(db, "profiles"), {
            rest: { grid: !gridRest },
        });
    };
    //latesGames functions
    const changeLGAlpha = () => {
        setLGAlpha(!LGAlpha);
        update(ref(db, "profiles"), {
            alpha: { latestGames: !LGAlpha },
        });
    };
    const changeLGBeta = () => {
        setLGBeta(!LGBeta);
        update(ref(db, "profiles"), {
            beta: { latestGames: !LGBeta },
        });
    };
    const changeLGPilots = () => {
        setLGPilots(!LGPilots);
        update(ref(db, "profiles"), {
            pilots: { latestGames: !LGPilots },
        });
    };
    const changeLGRest = () => {
        setLGRest(!LGRest);
        update(ref(db, "profiles"), {
            rest: { latestGame: !LGRest },
        });
    };
    //countdown functions
    const changeCountdownAlpha = () => setCountdownAlpha(!countdownAlpha);
    const changeCountdownBeta = () => setCountdownBeta(!countdownBeta);
    const changeCountdownPilots = () => setCountdownPilots(!countdownPilots);
    const changeCountdownRest = () => setCountdownRest(!countdownRest);
    //numQuestions functions
    const changeNumQuestionsAlpha = () => setNumQuestionsAlpha(!numQuestionsAlpha);
    const changeNumQuestionsBeta = () => setNumQuestionsBeta(!numQuestionsBeta);
    const changeNumQuestionsPilots = () => setNumQuestionsPilots(!numQuestionsPilots);
    const changeNumQuestionsRest = () => setNumQuestionsRest(!numQuestionsRest);
    return (
        <div className="wrapper-advanced-settings">
            <div
                className="grid-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto auto auto",
                    padding: "10px",
                }}
            >
                <div className="grid-item"></div>
                <div className="grid-item">
                    <h2>Grid</h2>
                </div>
                <div className="grid-item">
                    <h2>Latest Games</h2>
                </div>
                <div className="grid-item">
                    <h2>Countdown</h2>
                </div>
                <div className="grid-item">
                    <h2>NumQuestions</h2>
                </div>
                <div className="grid-item">
                    <h2>Background</h2>
                </div>
                <div className="grid-item">
                    <h2>Alpha</h2>
                </div>
                <div
                    className="grid-item"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <button
                        onClick={changeGridAlpha}
                        style={
                            !gridAlpha
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {gridAlpha ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeLGAlpha}
                        style={
                            !LGAlpha
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {LGAlpha ? "ON" : "OFF"}
                    </button>
                </div>

                <div className="grid-item">
                    <button
                        onClick={changeCountdownAlpha}
                        style={
                            !countdownAlpha
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {countdownAlpha ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeNumQuestionsAlpha}
                        style={
                            !numQuestionsAlpha
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {numQuestionsAlpha ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <div className="color-palette">
                        <div
                            className="palette-part"
                            style={{ background: "rgb(76,110,245)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(253,233,186)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(254,224,224)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(224,242,201)" }}
                        ></div>
                    </div>
                </div>
                <div className="grid-item">
                    <h2>Beta</h2>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeGridBeta}
                        style={
                            !gridBeta
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {gridBeta ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeLGBeta}
                        style={
                            !LGBeta
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {LGBeta ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeCountdownBeta}
                        style={
                            !countdownBeta
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {countdownBeta ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeNumQuestionsBeta}
                        style={
                            !numQuestionsBeta
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {numQuestionsBeta ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <div className="color-palette">
                        <div
                            className="palette-part"
                            style={{ background: "rgb(215,223,253)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(250,176,5)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(254,210,210)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(224,242,201)" }}
                        ></div>
                    </div>
                </div>
                <div className="grid-item">
                    <h2>Pilots</h2>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeGridPilots}
                        style={
                            !gridPilots
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {gridPilots ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeLGPilots}
                        style={
                            !LGPilots
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {LGPilots ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeCountdownPilots}
                        style={
                            !countdownPilots
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {countdownPilots ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeNumQuestionsPilots}
                        style={
                            !numQuestionsPilots
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {numQuestionsPilots ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <div className="color-palette">
                        <div
                            className="palette-part"
                            style={{ background: "rgb(215,223,253)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(253,233,186)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(250,82,82)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(224,242,201)" }}
                        ></div>
                    </div>
                </div>
                <div className="grid-item">
                    <h2>Rest</h2>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeGridRest}
                        style={
                            !gridRest
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {gridRest ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeLGRest}
                        style={
                            !LGRest
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {LGRest ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeCountdownRest}
                        style={
                            !countdownRest
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {countdownRest ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <button
                        onClick={changeNumQuestionsRest}
                        style={
                            !numQuestionsRest
                                ? { backgroundColor: "rgba(255, 99, 71, 0.9)" }
                                : { backgroundColor: "rgba(123, 239, 178, 1)" }
                        }
                    >
                        {numQuestionsRest ? "ON" : "OFF"}
                    </button>
                </div>
                <div className="grid-item">
                    <div className="color-palette">
                        <div
                            className="palette-part"
                            style={{ background: "rgb(215,223,253)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(253,233,186)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(254,210,210)" }}
                        ></div>
                        <div
                            className="palette-part"
                            style={{ background: "rgb(130,201,30)" }}
                        ></div>
                    </div>
                </div>
            </div>

            <div
                className="setup-footer"
                style={{ marginTop: "5%", textAlign: "center" }}
            >
                <Link href="/" className="re-home link">
                    Go to app!
                </Link>
            </div>
        </div>
    );
};

export default App;
