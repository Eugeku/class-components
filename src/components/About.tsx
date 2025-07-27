import React from 'react';
import Navigation from '@components/Navigation';

const About: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="about-page">
        <h2>About page</h2>
        <p>
          Author:{' '}
          <a
            href="https://github.com/Eugeku"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eugeku
          </a>
        </p>
        <p>
          This app was created as a project during the{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School React course
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default About;
