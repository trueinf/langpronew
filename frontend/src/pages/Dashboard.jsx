import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import "./Dashboard.css";

function Dashboard() {
    const [inpText, setInpText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [translatedTextClaude, setTranslatedTextClaude] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Use Fetch API for streaming response
            const response = await fetch('https://lang-pro-backend.vercel.app/api/Translate', {
                method: 'POST',
                headers: {
                    'Authorization': 'token 123reducted',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inpText: inpText })
            });

            if (!response.body) {
                throw new Error('Readable stream not supported');
            }

            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();

            let result = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                console.log('Received: ', value);
                result += value;
                setTranslatedText((prev) => prev + value); // Update the state with the new chunk of data
            }


            // const response = await axios.post('http://localhost:5000/api/Translate', { inpText: inpText });
            // console.log(response);
            // const translated = response.data.translated;
            const response2 = await fetch('https://lang-pro-backend.vercel.app/api/Translate2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ inpText: inpText })
            });

            if (!response2.body) {
                throw new Error('Readable stream not supported');
            }

            const reader2 = response2.body
                .pipeThrough(new TextDecoderStream())
                .getReader();

            let result2 = '';
            while (true) {
                const { value, done } = await reader2.read();
                if (done) break;
                console.log('Received: ', value);
                result2 += value;
                setTranslatedTextClaude((prev) => prev + value); // Update the state with the new chunk of data
            }
            // const response2 = await axios.post('http://localhost:5000/api/Translate2', { inpText: inpText });
            // console.log(response2);
            // const translatedClaude = response2.data.Claudetranslated;
            // setTranslatedTextClaude(translatedClaude);
        } catch (error) {
            console.log("Error getting results", error);
        }
    };

    return (
        <div className="Main">
            <form onSubmit={handleSubmit}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                >
                    Translate
                </Button>
                <Box className="Boxalign">
                    <TextField
                        id="inpText"
                        label="Enter text to translate"
                        multiline
                        rows={20}
                        variant="outlined"
                        value={inpText}
                        onChange={(e) => setInpText(e.target.value)}
                        style={{ width: "80%", marginTop: '20px' }}
                    />

                    <TextField
                        id="translatedText"
                        disabled
                        label="Response 1"
                        multiline
                        rows={20}
                        variant="outlined"
                        value={translatedText}

                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        InputProps={{ readOnly: true }}
                        style={{ width: "80%", marginTop: '20px' }}

                    />

                    <TextField
                        id="translatedText"
                        disabled
                        label="Response 2"
                        multiline
                        rows={20}
                        variant="outlined"
                        value={translatedTextClaude}
                        InputProps={{ readOnly: true }}
                        style={{ width: "80%", marginTop: '20px' }}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                    />


                </Box>
            </form>
        </div>
    );
}

export default Dashboard;

