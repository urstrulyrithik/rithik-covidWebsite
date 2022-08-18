const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rithik'
})

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log("mysql connected")
})

app.listen(3005, () => {
  console.log('running on port http://localhost:3005')
})

app.post("/register", async (request, response) => {
  const { username, email, password, fullname } = request.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  const selectUserQuery = `SELECT * from USERS where username="${username}";`;

  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    if (result.length === 0) {
      if (password.length < 6) {
        response.status(200);
        response.send("Password is too short");
      } else {
        try {
          const createUserQuery = `insert into users (username,password,email,fullname)
                  values("${username}","${hashedPassword}","${email}","${fullname}");`;
          db.query(createUserQuery, (error, result) => {
            console.log("error", error)
            console.log('result', result)
            response.status(200).send(`User created successfully`);
          });
        } catch (error) {
          console.log(error)
        }

      }
    } else {
      response.status(200);
      response.send("User already exists");
    }

  });
})


app.post("/login", async (request, response) => {
  console.log("login triggered")
  console.log(request.body)
  const { username, password } = request.body;
  console.log(username, password)
  const selectUserQuery = `select * from users where username="${username}";`;

  db.query(selectUserQuery, async (error, result) => {

    if (result.length === 0) {
      response.status(200).send("Invaild username")
    } else {
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if (isPasswordMatched) {
        const payload = {
          username: username,
        };
        const jwtToken = jwt.sign(payload, "RithikCovid");
        response.send({ jwtToken });
      } else {
        response.status(200);
        response.send("Invalid password");
      }
    }
  })
});


app.post("/feedback", async (request, response) => {
  const { UiRating,
    feedbackText,
    informativeRating,
    codingStructureRating,
    overallRating } = request.body;
  const DT = new Date().toLocaleString();

  const postFeedbackQuery = `INSERT into feedbacks (UiRating,informativeRating,codingStructureRating,
                             overallRating,feedbackText,DTofFeedback) VALUES 
                            ("${UiRating}","${informativeRating}","${codingStructureRating}",
                            "${overallRating}","${feedbackText}","${DT}");`;
  try {
    db.query(postFeedbackQuery, (error, result) => {
      console.log('error', error);
      console.log('result', result)

      response.status(200);
      response.send("Feedback posted successfully");
    })
  }
  catch (error) {
    console.log(error)
  }

});
