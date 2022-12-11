const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8082

const data=require("./InitialData")

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//  get all data of the students
app.get("/api/student",(req,res)=>{
    res.send({
        result:"data is fetched",
        data:data
    })
})




//   searching part     //  GET ()

app.get("/api/student/:id", async (req, res) => {

    const _id = req.params.id

    await data.map((data) => {

    try{
          if (data.id == _id) {

            console.log(data)
            res.send({
                result:"data is fetched",
                data:data
            })

        }
        

    }      
    
        catch (e) {
            res.status(404)
        }
    
    })
})

   //     POST part   
   let studentid=data.length
 
app.post("/api/student", async (req, res) => {

      studentid=studentid+1

    try {
        data.push({
            id:studentid,
            name:req.body.name,
            currentClass:req.body.currentClass,
            division:req.body.division
            
        })

       
        console.log(data)

        res.send({
            result: "posted sucessfully",

        })


    }
    catch (e) {
        res.status(404).send("NOT FOUND")
    }
});



// delete part

app.delete("/api/student/:id", async (req, res) => {

    try {
        const param = req.params.id

        data.map((data1) => {

            if (data1.id == param) {
                const index = data.indexOf(data1)
                data.splice(index, 1)
            }
        })
        console.log(data)
        res.send({
            result: "deleted sucessfully"
        })
    }

    catch (e) {
        res.status(404)
    }
})

// update part

app.put("/api/student/:id", async (req, res) => {


    try {
        const param = req.params.id
        data.map((data1) => {

            if (data1.id == param) {
               

                data1.name = req.body.name
                data1.currentClass = req.body.currentClass
                data1.division = req.body.division

            }
        })
        console.log(data)
        res.send({
            result: "updated sucessfully"
        })
    }
    catch (e) {
        res.status(404)
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   