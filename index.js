const express=require('express')
const userRouter=require('./rourer/userRouter')
const app=express()
const port = 5000;
app.use('/user',userRouter)
app.get('/', (req, res) => {
    res.send('response from userRouter')
})
app.listen(port, () => {
    console.log('server started')
})