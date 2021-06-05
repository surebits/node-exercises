const http = require("http");
const url = require("url");
const calculator = require('./calculator');

const endpoint = "http://localhost:8080";

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    
    const {operator, num1, num2} =  q.query

    const first = parseInt(num1);
    const second = parseInt(num2);
    let result;

    if(!isNaN(first) && !isNaN(second)) {
        result = calculator[operator](first, second);
    }

    res.writeHead(200); // Content-Type not included
    res.write(`
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>Simple Calculator</title>
        </head>
        
        <body>            
            <form action="${endpoint}">
            ${result ?
                 `<p>Your answer is: ${result}</p>
                 <input type="submit" value="Another calculation" />`                                   
                 :
            `<div>
                    <p>Simple calculator</p>    
                    <p>
                        <select name="operator" id="operator">
                            <option value="add">Add</option>
                            <option value="subtract">Subtract</option>
                            <option value="multiply">Multiply</option>
                            <option value="divide">Divide</option>
                        </select>
                        
                    </p>                
                    Number 1: <input type="text" name="num1" />             
                    <p>
                    Number 2: <input type="text" name="num2" /><br />    
                    </p>        
                    <input type="submit" value="Submit" />            
                </div>
            `}
            </form>        
        </body>
        
        </html>
    `);
    return res.end();
  })
  .listen(process.env.PORT || 8080);
