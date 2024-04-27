const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());

JWT_TOKEN = "IuXno8HwSauaVZ7eK+cOvYQ8Qxoc80RhJYKX/twR/EORogFY1wb/ct5aTnvWgwQxrdk47+HDKg/CE0qah2wxMw=="

user_token = "eyJhbGciOiJIUzI1NiIsImtpZCI6InZObWF5NXpMTUdEQWZPWlIiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE0MDE2MTcwLCJpYXQiOjE3MTQwMTI1NzAsImlzcyI6Imh0dHBzOi8vanFzcWpyY2F4bnhqcnFlbm5obWsuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImIzZWIyZjExLTA5NjAtNDFlZS1iMDQ1LTlkZmJkYjYxN2MxNCIsImVtYWlsIjoiYmhhcnRpeWFhbnNodWxAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib3RwIiwidGltZXN0YW1wIjoxNzE0MDEyNTcwfV0sInNlc3Npb25faWQiOiJhZGFhNWIxYy0xMGM4LTQ3YzktOWE5OC05MWVmMmFiMTYxNDIiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.UK87sMsBsK6IcxnwHnfSzv5NFF8cSK290UJadLMrCy0&expires_at=1714016170&expires_in=3600&refresh_token=0gp2oviYa1IbP5zGuVmvcg&token_type=bearer&type=magiclink"

app.use(express.json());

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://jqsqjrcaxnxjrqennhmk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxc3FqcmNheG54anJxZW5uaG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MTI3MjEsImV4cCI6MjAyOTA4ODcyMX0.19Y3Zjd72vKn6S9Us2djfjj7BUDSkkqBwbu6j8y2ug4')

app.post('/post/', async (req, res) => {

    const { id, title, task } = req.body
    const { error } = await supabase
        .from('Task')
        .insert({ id: id, title: title, task: task })
    console.log(title, task, error);

    res.send(
        {
            "status": 200,
            "statusText": JSON.stringify({ id: id, title: title, task: task })
        }
    )
})

// app.post('/post/', async (req,res)=>{

//     var token = req.headers['x-access-token'];


//     if(supabase.auth.signInWithIdToken(token)){
//         const {id, title, task } = req.body
//         const { error } = await supabase
//             .from('Task')
//             .insert({ id: id, title: title, task: task })
//         console.log(title,task,error);
//     }
//     else{
//         res.send(
//             {
//             "status": 400,
//             "statusText": "User is not Authorised"
//             }
//             )
//     }
//     supabase.auth.getUser("jwt")

//     res.send(
//         {
//         "status": 201,
//         "statusText": JSON.stringify({id: id, title: title, task: task})
//         }
//         )
// })

app.get('/post/', async (req, res) => {

    const { data, error } = await supabase
        .from('Task')
        .select('*')

    res.send(data)
}
)

app.get('/post/Id/', async (req, res) => {

    const { id, title } = req.query
    let query = supabase.from('Task').select()

    if (id != null) {
        query = query.eq('id', id)
    }
    else {
        query = query.eq('title', title)
    }

    const { error, data } = await query
    res.send(data)
})

app.delete('/post/', async (req, res) => {

    const { id } = req.query
    console.log(id)
    const { error } = await supabase
        .from('Task')
        .delete()
        .eq('id', id)

        console.log("deleted")

    res.send(
        {
            "status": 204,
            "message": "Task Deleted!"
        }
    )
}
)

app.put('/post/', async (req, res) => {

    const { id } = req.query
    const { error } = await supabase
        .from('Task')
        .update({ is_completed: true })
        .eq('id', id)

    res.send(
        {
            "status": 204,
            "message": "Task Completed"
        }
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})