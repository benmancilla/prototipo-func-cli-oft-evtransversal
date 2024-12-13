import React from 'react';
import ExamsList from './exams-list';
import AddExamForm from './add-exam';
import { Link } from 'react-router-dom';

const Exams = () => {
    return (
        <section>
            <Link to="/dashboard" className="back-btn">Volver</Link>
            <div className="exam-utilities-container">
                <AddExamForm/>
                <ExamsList/>
            </div>

        </section>
    );
};

export default Exams;
