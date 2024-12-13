import React, { useState, useEffect } from 'react';

const PatientsList = () => {
    const [patients, setPatients] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredPatients, setFilteredPatients] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 

    const fetchPatients = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/pacientes/');
            if (!response.ok) {
                throw new Error('Error al cargar pacientes');
            }
            const data = await response.json();
            setPatients(data);
            setFilteredPatients(data); 
        } catch (err) {
            console.error('Error fetching patients:', err);
            setError('Error al cargar pacientes');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []); 

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === '') {
            setFilteredPatients(patients);
        } else {
            const filtered = patients.filter(patient =>
                patient.num_rut.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPatients(filtered);
        }
    };

    return (
        <div className="container">
            <h2>Lista de Pacientes</h2>
        <div id='divedit1'>
        <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Buscar por RUT"
                className="search-bar"
            />

            <button
                onClick={fetchPatients}
                className="btn btn-refresh"
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Refrescar'}
            </button>
        </div>


            {error && <div className="alert alert-danger">{error}</div>}

            <div className="patients-container">
                {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                        <div key={patient.id} className="patient-card">
                            <p>
                                {patient.primer_nombre} {patient.segundo_nombre} {patient.apellido_paterno} {patient.apellido_materno}, {patient.num_rut}-{patient.dv_rut}
                                , {patient.sist_salud}
                            </p>
                        </div>
                    ))
                ) : (
                    <p id="no-patients">No se encontraron pacientes.</p>
                )}
                {loading && <p>Cargando pacientes...</p>}
            </div>
        </div>
    );
};

export default PatientsList;
