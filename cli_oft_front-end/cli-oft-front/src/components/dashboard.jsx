import React from 'react';
import examsIcon from '../assets/img/exams.svg';
import patientsIcon from '../assets/img/patients.svg'
import UtilityCard from './utility-card';

const Dashboard = () => {
    return (
        <section className="home">
        <UtilityCard icon={examsIcon} title="Exámenes" link="/exams" />
        <UtilityCard icon={patientsIcon} title="pacientes" link="/patients" />
        </section>
    );
};

export default Dashboard;
