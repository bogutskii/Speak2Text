import React from 'react'

function About() {
    const year = new Date().getFullYear();
    return (
        <div>
            <h1>About</h1>
            <p>This application is designed for efficient and accurate speech recognition. It allows users to convert their
                spoken words into text in real-time.</p>
            <h2>Features</h2>
            <ul>
                <li>Real-time speech to text conversion</li>
                <li>Support for multiple languages</li>
                <li>User-friendly interface</li>
            </ul>
            <h2>About the Author</h2>
            <p>The Speech Recognition App was developed by Petr Bogutskii, a dedicated software developer with a passion for
                creating innovative and user-friendly digital solutions.</p>
            <p>You can contact us through our feedback form.</p>
            <a href="https://github.com/bogutskii" target="_blank" className="link-with-icon" rel="noreferrer noopener">
                <img className="githubLogo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"/>
                Follow me on GitHub
            </a>
            <p className="copyright">© {year} Petr Bogutskii</p>
        </div>
    );
}


export default About;