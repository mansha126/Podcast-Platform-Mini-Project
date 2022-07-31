const express = require('express')
const app=express()
const userRouter = require('./routers/userRouter')
const podcastRouter = require('./routers/podcastRouter')
const util=require('./routers/util')
const otpRouter=require('./routers/otpRouter')

const cors = require('cors')
app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())

const port = process.env.PORT||5000;
app.use('/user', userRouter)
app.use('/podcast', podcastRouter)
app.use('/util', util)
app.use('/otp', otpRouter)


app.use(express.static('./static/uploads'))

app.use(express.static('./static/uploads'));

app.get('/', (req, res) => {
    res.send('response from userRouter')
})
app.listen(port, () => {
    console.log('server started')
})