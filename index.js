const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const db = require("./conn")

app.use(bodyParser.json())


const response = (statusCode, data, mess, res) =>{
    res.status(statusCode).json({
        payload : {
            statusCode : statusCode,
            data : data,
            mess : mess
        },

        pagination : {
            prev : "",
            next : "",
            max : ""
        }
    })
}

app.get('/', (req, res)=>{
    db.query("SELECT * FROM datamahasiswa", (error, result)=>{
        response(200 , result, "sent", res)
    })

})

app.post('/', (req, res)=>{
    const {  nama, npm, jurusan, semester, ipk, kelas, alamat, no_telepon, email } = req.body
    db.query(`INSERT INTO datamahasiswa ( nama, npm, jurusan, semester, ipk, kelas, alamat, no_telepon, email) VALUES
     (  '${nama}', '${npm}', '${jurusan}', ${semester}, ${ipk}, '${kelas}', '${alamat}', ${no_telepon}, '${email}')`, (error, result)=>{
        if(error) throw error
        if(result?.affectedRows){
            const data = {
                isSuccess : result.affectedRows,
                id : result.insertId
            }
            response(200, data , "data added", res)
        }
    })
})

app.put('/', (req, res)=>{
    const {  nama, id, jurusan, semester, ipk, kelas, alamat, no_telepon, email } = req.body
    db.query(`UPDATE datamahasiswa SET nama = '${nama}',  jurusan = '${jurusan}', semester = ${semester}, ipk = ${ipk}, kelas = '${kelas}', alamat = '${alamat}', no_telepon = ${no_telepon}, email = '${email}' WHERE id = ${id}`, 
        (error, result)=>{
            if(error) throw error
            if(result?.affectedRows){
                const data = {
                    isSuccess : result.affectedRows,
                    id : result.insertId
                }
                response(200, data , "data changed", res)
            }
            else{
                response(500, "invalid", "eror dek", res)
            }
        }
    )

})

app.delete('/', (req, res)=>{
    const { id} = req.body
    db.query(`DELETE FROM datamahasiswa WHERE id = ${id}`,(error, result)=>{
        if(error) throw error
        if(result?.affectedRows){
            const data = {
                isDeleted : result.affectedRows
            }
            response(200, data, "data has been deleted", res)
        }
    })
})



app.listen(port, ()=>{
    console.log(`port running on ${port}`)
})