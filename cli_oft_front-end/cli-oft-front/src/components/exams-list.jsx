import React, { useState, useEffect } from 'react';

const ExamsList = () => {
    const [exams, setExams] = useState([]);
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExams, setFilteredExams] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchData = async () => {
        try {
            const [examsResponse, patientsResponse] = await Promise.all([
                fetch('http://localhost:8000/api/examenes/'),
                fetch('http://localhost:8000/api/pacientes/')
            ]);


            if (!examsResponse.ok || !patientsResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const examsData = await examsResponse.json();
            const patientsData = await patientsResponse.json();


            setExams(examsData);
            setPatients(patientsData);
            setFilteredExams(examsData);  
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();  
    }, []);  

    // Handle search functionality
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);


        if (query === '') {
            setFilteredExams(exams); 
        } else {
            const filtered = exams.filter(exam => {
                const patient = patients.find(p => p.id === exam.paciente);
                return patient && patient.num_rut.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredExams(filtered); 
        }
    };

    return (
        <div className="container">
            <h2>Resultados Examenes</h2>

            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Buscar por RUT"
                className="search-bar"
            />

            {loading && <p>Cargando exámenes y pacientes...</p>}

            <button onClick={fetchData} className="btn-refresh">
                Refrescar
            </button>

            <div className="exams-container">
                {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => {
                        const patient = patients.find(p => p.id === exam.paciente);
                        return (
                            <div key={exam.id} className="exam-card">
                                <p>{exam.titulo_examen}, {patient ? `${patient.num_rut}-${patient.dv_rut}` : 'Cargando paciente...'}, {new Date(exam.fecha_subida).toLocaleString()}</p>
                                {exam.archivo_pdf && (
                                    <a href={exam.archivo_pdf} target="_blank" rel="noopener noreferrer">
                                        Ver PDF
                                    </a>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p id="non-exams">No se encontraron exámenes.</p>
                )}
            </div>
        </div>
    );
};

export default ExamsList;
