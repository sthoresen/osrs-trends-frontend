import React from 'react';

const About = () => {
    const poemStyle = {
        fontSize: '1.5rem',
        lineHeight: '1.8',
        color: '#333',
        marginTop: '20px',
        width: '80%',
        margin: '20px auto',
    };

    return (
        <div>

            <div style={poemStyle}>
                <p>This website provides tools to find long-term investments on the Grand Exchange, in the video game <i>Old School RuneScape</i>.</p>
                <p>In contrast to real-life stock markets, the Grand Exchange is arguably not an efficient market as very few players engage
                    in long-term investing.
                    This makes it possible for simple mean-reversal strategies to have strong performance. The tools featured on this
                    website are designed to
                    assist users in identifying and quantitatively assessing such opportunities.</p>
                <p><strong>Trends:</strong> Analyze the price history and characteristics of traded items.</p>
                <p><strong>Returns:</strong> Estimate possible trading returns. The estimations are constrained by a set of assumptions
                    and should be considered directional assessments only.</p>
                <p>For more information, please visit the <a href="https://github.com/sthoresen/osrs-trends-frontend" target="_blank"
                    rel="noopener noreferrer">GitHub repository</a>.</p>

            </div>
        </div>
    );
};

export default About;