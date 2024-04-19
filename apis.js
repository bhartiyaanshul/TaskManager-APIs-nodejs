const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const { createClient } = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
const supabase = createClient('https://jqsqjrcaxnxjrqennhmk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxc3FqcmNheG54anJxZW5uaG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MTI3MjEsImV4cCI6MjAyOTA4ODcyMX0.19Y3Zjd72vKn6S9Us2djfjj7BUDSkkqBwbu6j8y2ug4')

app.post('/post/', async (req,res)=>{
    const {id, title, task } = req.body
    const { error } = await supabase
        .from('Task')
        .insert({ id: id, title: title, task: task })
    console.log(title,task,error);

    res.send(
        {
        "status": 201,
        "statusText": "Created"
        }
        )

})

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

        if(id!=null){
            query = query.eq('id',id)
        }
        else{
            query = query.eq('title',title)
        }

        const {error ,data} = await query
        res.send(data)
})

app.delete('/post/', async (req, res) => {

    const { id } = req.query
    const { error } = await supabase
        .from('Task')
        .delete()
        .eq('id', id)
        
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