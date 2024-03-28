import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json)

app.get("/test", (req, res) => {
    console.log("This is a test for server and nodemon")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
