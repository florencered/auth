const express = require('express');
const auth=require("./routes/auth"); 
const post=require("./routes/post");
const app = express()
const port = 3000


//allow express to access json objects for getting data from the user
app.use(express.json());

app.use("/auth",auth);
app.use("/posts",post);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
