import React from 'react'
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const LandingPage: React.FC = () => {

    const { username } = useParams<{ username: string }>();

    return(
        <div className='container mt-5'>
            <h2 className='mb-3'>{ username } Job Application Tracker, Welcomes you!</h2>
             
            <p className="lead">
                This is your personal job application diary — a private
                space to track every job you've applied for, reflect on 
                the process, and grow with each step.
            </p>

            <div className="mb-4">
                <h4>Key features</h4>
                <ul className="list-ustyled">
                    <li>Add and manage job applications with detailed information</li>
                    <li>Track application statuses (Applied, Interview Scheduled, Feedback, Follow-Up)</li>
                    <li>Write and store personal notes to improve your job search</li>
                    <li>Delete applications once the process is complete</li>
                </ul>
            </div>
            
            <div className="mt-5">
                <blockquote className="blockqoute">
                    “Success is the sum of small efforts, repeated day in and day out.” 
                    – Robert Collier
                </blockquote>
            </div>   
        </div>
    );
};