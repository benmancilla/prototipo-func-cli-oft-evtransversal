import React from 'react';
import { Link } from 'react-router-dom';
import PatientsList from './patient-list';
import AddPatient from './add-patients';

const Patients = () => {
    return (
        <section>
            <Link to="/dashboard" className="back-btn">Volver</Link>
            <div className="patients-utilities-container">
                <AddPatient/>
                <PatientsList/>
            </div>

        </section>
    );
};

export default Patients;
