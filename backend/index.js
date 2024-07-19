const express = require("express");
const cors = require('cors');
const Translate = require("./api/Translate.js");
const app = express();
const port = 5000;

app.use(cors());
app.use(cors({
    origin: 'https://lang-pro-frontend.vercel.app/'
}));
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ message: "Backend On!!" }));



app.post('/api/Translate', async (req, res) => {
    const { inpText } = req.body;
    try {

        // let starttime = Date.now();
        const stream = await Translate.TranslateLang(inpText, "English");
        
        for await (const part of stream) {
            if (part.choices[0].finish_reason === "stop") {
                res.end();
                return;
            }
            console.log(part.choices[0]?.delta?.content)
            res.write(part.choices[0]?.delta?.content || "");
        }
    }
    catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post('/api/Translate2', async (req, res) => {
    const { inpText } = req.body;
    try {
        // const translated= await Translate.TranslateLang(inpText,"English");
        // const Claudetranslated= await Translate.ClaudTranslate(inpText,"English");
        const stream = await Translate.ClaudTranslate(inpText, "English");
        for await (const part of stream) {
            console.log(part);
            if (part?.type === "message_stop") {
                res.end();
                return;
            }
            console.log(part?.delta?.text);
            res.write(part?.delta?.text || "");
        }
        // const Claudetranslated = await Translate.ClaudTranslate(inpText, "English");
        // res.json({ Claudetranslated });
    }
    catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
