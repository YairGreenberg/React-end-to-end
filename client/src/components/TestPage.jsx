import { useState } from 'react';
import axios from 'axios';

const TestPage = ({ data }) => {
    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');

    const fields = ['iyear', 'country_txt', 'attacktype1_txt', 'city'];

    const generateQuestion = () => {
        if (data.length === 0) return;
        
        const randomRow = data[Math.floor(Math.random() * data.length)];
        const shuffled = [...fields].sort(() => 0.5 - Math.random());
        
        setQuestion({
            xField: shuffled[0], xVal: randomRow[shuffled[0]],
            yField: shuffled[1], yVal: randomRow[shuffled[1]],
            zField: shuffled[2], zCorrect: randomRow[shuffled[2]]
        });
        setUserAnswer('');
        setMessage('');
    };

    const checkAnswer = () => {
        if (userAnswer.trim().toLowerCase() === question.zCorrect.toLowerCase()) {
            setScore(s => s + 1);
            setMessage("Correct! +1 point");
        } else {
            const altMatch = data.find(row => 
                row[question.xField] === question.xVal && 
                row[question.yField] === question.yVal && 
                row[question.zField]?.toLowerCase() === userAnswer.trim().toLowerCase()
            );

            if (altMatch) {
                setScore(s => s + 1);
                setMessage("Correct (found alternative match)! +1 point");
            } else {
                setMessage(`Wrong. No matching result found for "${userAnswer}".`);
            }
        }
    };

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:3033/api/save-result', { score });
            alert("Score saved!");
        } catch (err) {
            alert("Failed to save score");
        }
    };

    return (
        <div>
            <h1>Dynamic Test</h1>
            <h3>Score: {score}</h3>
            
            {!question ? (
                <button onClick={generateQuestion}>Start Test</button>
            ) : (
                <div style={{border: '1px solid black', padding: '20px'}}>
                    <p>Given <strong>{question.xField}</strong> is <strong>{question.xVal}</strong></p>
                    <p>And <strong>{question.yField}</strong> is <strong>{question.yVal}</strong></p>
                    <p>What is the <strong>{question.zField}</strong>?</p>
                    
                    <input value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
                    <button onClick={checkAnswer}>Submit Answer</button>
                    <button onClick={generateQuestion} style={{marginLeft: '10px'}}>Next Question</button>
                </div>
            )}
            <p><strong>{message}</strong></p>
            <hr />
            <button onClick={handleSave} style={{backgroundColor: 'lightgreen'}}>Save Final Score to Server</button>
        </div>
    );
};

export default TestPage;