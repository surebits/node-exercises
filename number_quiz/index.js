const http = require("http");
const url = require("url");

const quiz = [
    [3,1,4,1,5],
    [1,1,2,3,5],
    [1,4,9,16,25],
    [2,3,5,7,11],
    [1,2,4,8,16],
];

const endpoint = "https://cs472-calc.herokuapp.com/";

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    
    const {answer, quizId=0, score=0} =  q.query
    let id = parseInt(quizId);

    const question = quiz[id];
    let result = parseInt(score);
    let completed = false;

    if (answer) {
        if (question && parseInt(answer) === question[question.length-1]) result++

    completed = id == 4;
    id++;
    }
    
    res.writeHead(200); // Content-Type not included
    res.write(`
    <!DOCTYPE html>
        <html>        
        <head>
            <title>Number Quiz</title>
        </head>
        
        <body>        
            <h1>Number Quiz Lab</h1>
            <form action="${endpoint}">
                <div>
                    <p>Your current score is ${result}</p>                    
                   ${!completed ? 
                    `
                    <p>Guess the next number in the sequence</p>
                    <p>${quiz[id].slice(0,4)}</p>
                    <input type="hidden" id="quizId" name="quizId" value="${id}">
                    <input type="hidden" id="score" name="score" value="${result}">
                    <p>Your answer: <input type="text" name="answer" /><p>            
                    <input type="submit" value="Click" />`
                        :
                        `<p>You have completed the Number Quiz, with a score of ${result} out of ${quiz.length}<p>`
                    }
                </div>
            </form>
        </body>
        
    </html>    
    `);
    return res.end();
  })
  .listen(process.env.PORT || 8080);
