const express = require("express");
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const OpenAI = require('openai');
const { Stream } = require("stream");
const Anthropic = require('@anthropic-ai/sdk');
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
async function TranslateLang(text, lang) {
    try {
        // const prompt = `Translate the given text: "${text}" into this language ${lang}`;
        // const prompt = `Translate the following ${lang} news report: ${text} into ${lang}, adhering to the style and structure typical of Tamil news writing. Pay particular attention to:
        //                 1. Beginning the ${lang} sentence with relevant context or background information.
        //                 2. Following the SOV (Subject-Object-Verb) word order common in ${lang}.
        //                 3. Placing the main action and subject after the contextual information.
        //                 4. Ending clauses and the sentence with verbs.
        //                 5. Using appropriate ${lang} formal language and news reporting style.`;

                    // functions: [
            //     {
            //         name: "Translate",
            //         parameters: {
            //             type: "object",
            //             properties: {
            //                 Translated: {
            //                     type: "string",

            //                     description: `translated text in the language ${lang}`
            //                 }

            //             },
            //             required: ["Translated"]
            //         }
            //     }
            // ],
            // function_call: { name: "Translate" },
        const prompt = `Translate the given Kannada text to ${lang}, focusing on sentence structure:
 
                        1. Analyze the Kannada sentence structure:
                        a. Identify the main components (subject, object, verb).
                        b. Note the word order (typically SOV - Subject-Object-Verb in Kannada).
                        c. Identify any postpositions and their functions.
                        
                        2. Transform to ${lang} structure:
                        a. Rearrange components to fit ${lang} SVO (Subject-Verb-Object) order.
                        b. Convert postpositions to prepositions where necessary.
                        c. Adjust placement of modifiers to match ${lang} conventions.
                    
                        3. Handle Kannada-specific features:
                            a. Resolve any agglutinative word forms into separate ${lang} words.
                            b. Translate case markers appropriately (e.g., accusative '-annu' to direct object).
                            c. Address any topic-comment structures.
                            
                        4. Manage verb forms:
                            a. Translate Kannada tense and aspect to appropriate ${lang} verb forms.
                            b. Handle any honorifics or levels of politeness in verbs.
                            
                        5. Address idiomatic expressions:
                            a. Identify any Kannada idioms or colloquialisms.
                            b. Translate to equivalent ${lang} expressions, not literal translations.
                            
                        6. Maintain emphasis and focus:
                            a. Note which elements are emphasized in Kannada (e.g., through word order).
                            b. Use appropriate ${lang} structures to maintain this emphasis.
                            
                        7. Consider context:
                            a. If it's a headline, use concise ${lang} headline style.
                            b. Expand abbreviations if their meaning is clear from context.
                            
                        8. Ensure natural ${lang} phrasing:
                            a. Adjust structures for fluency, even if it requires significant changes.
                            b. Use articles (a, an, the) appropriately, which are absent in Kannada.
                            
                        9. Output format:
                            Provide only the final translated ${lang} text. Do not include any explanations, notes, or details about the translation process.
                            
                        Kannada text to translate:${text}`
        return (openai.chat.completions.create({
            model: "gpt-4o",

            messages: [
                {
                    role: "system",
                    content: "You are a language translator.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            stream: true,

            temperature: 0.1,

        }));
        // for await (const chunk of stream) {
        //     console.log(chunk);
        //     if (chunk.choices[0].delta.content !== null) {
        //         process.stdout.write(chunk.choices[0].delta.content);
        //     }
        // }

        // for await (const chunk of response) {
        //     process.stdout.write(chunk.choices[0]?.delta?.content || "");
        // }

        // const content = response.choices[0].message.content;
        // console.log(content);
        // return content;
        // const result = JSON.parse(response.choices[0].message.function_call.arguments);
        // console.log(result);
        // return result;
    } catch (error) {
        console.error('Error getting response:', error);
    }
}


async function ClaudTranslate(text, lang) {
    // const prompt = `Translate the following English news report: ${text} into ${lang}, adhering to the style and structure typical of Tamil news writing. Pay particular attention to:
    //                     1. Beginning the ${lang} sentence with relevant context or background information.
    //                     2. Following the SOV (Subject-Object-Verb) word order common in ${lang}.
    //                     3. Placing the main action and subject after the contextual information.
    //                     4. Ending clauses and the sentence with verbs.
    //                     5. Using appropriate ${lang} formal language and news reporting style.`;
    const prompt = `Translate the given Kannada text to ${lang}, focusing on sentence structure:

                    1.Analyze the Kannada sentence structure:
                    a. Identify the main components (subject, object, verb).
                    b. Note the word order (typically SOV - Subject-Object-Verb in Kannada).
                    c. Identify any postpositions and their functions.

                    2.Transform to ${lang} structure:
                    a. Rearrange components to fit ${lang} SVO (Subject-Verb-Object) order.
                    b. Convert postpositions to prepositions where necessary.
                    c. Adjust placement of modifiers to match ${lang} conventions.

                    3. Handle Kannada-specific features:
                    a. Resolve any agglutinative word forms into separate ${lang} words.
                    b. Translate case markers appropriately (e.g., accusative '-annu' to direct object).
                    c. Address any topic-comment structures.

                    4. Manage verb forms:
                    a. Translate Kannada tense and aspect to appropriate ${lang} verb forms.
                    b. Handle any honorifics or levels of politeness in verbs.

                    5.Address idiomatic expressions:
                    a. Identify any Kannada idioms or colloquialisms.
                    b. Translate to equivalent ${lang} expressions, not literal translations.

                    6. Maintain emphasis and focus:
                    a. Note which elements are emphasized in Kannada (e.g., through word order).
                    b. Use appropriate ${lang} structures to maintain this emphasis.

                    7. Consider context:
                    a. If it's a headline, make it informative and crisp and in about 10 words.
                    b. Expand abbreviations if their meaning is clear from context.

                    8. Ensure natural ${lang} phrasing:
                    a. Adjust structures for fluency, even if it requires significant changes.
                    b. Use articles (a, an, the) appropriately, which are absent in Kannada.

                    9. Preserve specialized terms:
                    a. Identify administrative, legal, cultural, or locally specific terms.
                    b. Keep these terms in original Kannada, followed by a brief ${lang} explanation in parentheses.
                    c. Do this only for the first occurrence of each term.
                    d. Ensure these terms are integrated smoothly into the ${lang} translation.

                    10. Preserve original format and indentation:
                    a. Maintain the paragraph structure of the original text.
                    b. Retain any line breaks, indentations, or special formatting present in the Kannada text.
                    c. Keep the overall visual structure of the text as close to the original as possible.

                    Output format:
                    Provide only the final translated ${lang} text. Do not include any explanations, notes, or details about the translation process.

                    And finally polish the text to make it easily accessible to the general public in a news tonality.

                    Kannada text to translate:${text}`
    return (client.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 2000,
        temperature: 0.1,
        messages: [{
            "role": "user",
            "content": prompt
        }],
        stream: true,
        
    }));
    // const result = response.content[0].text;
    // console.log(result);
    // return response.content[0].text;


    // const result = response;
    // // const result = JSON.parse(response.choices[0].message.function_call.arguments);
    // console.log(result);
    // return result;
}
module.exports = {
    TranslateLang,
    ClaudTranslate,
};