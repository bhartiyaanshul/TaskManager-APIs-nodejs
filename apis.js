const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const { createClient } = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
const supabase = createClient('https://jqsqjrcaxnxjrqennhmk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxc3FqcmNheG54anJxZW5uaG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MTI3MjEsImV4cCI6MjAyOTA4ODcyMX0.19Y3Zjd72vKn6S9Us2djfjj7BUDSkkqBwbu6j8y2ug4')

app.post('/post/',(req,res)=>{
    const {id, title, task } = req.body

    const one = async ()=> {
        const { error } = await supabase
        .from('Task')
        .insert({ id: id, title: title, task: task })
        console.log(title,task,error);
    }
    one()
    res.send(
        {
          "status": 201,
          "statusText": "Created"
        }
    )
})

app.get('/post/', (req, res) => {

    const one = async ()=> {
        const { data, error } = await supabase
            .from('Task')
            .select('*')

            res.send(data)
    }
    one()
})

app.get('/post/Id/', (req, res) => {

    const { id, title } = req.query

    // $filter=(id eq '47415390' or id eq '106266659')
    const one = async ()=> {

        if(id!=null){
            const { data, error } = await supabase
            .from('Task')
            .select()
            .eq('id',id)
            console.log(error)
            console.log(data)
            res.send(data)
        }
        else{
            const { data, error } = await supabase
            .from('Task')
            .select()
            .eq('title',title)
            console.log(error)
            console.log(data)
            res.send(data)
        }
        
        // const { data, error } = await supabase
        // .from('Task')
        // .select('task')
        // .or(`id.in.(${id}),title.in.(${title})`)
            

            
    }
    one()
})

app.delete('/post/', (req, res) => {

    const { id } = req.query

    const one = async ()=> {

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
    one()
})

app.put('/post/', (req, res) => {

    const { id } = req.query

    const one = async ()=> {

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
    }
    one()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})