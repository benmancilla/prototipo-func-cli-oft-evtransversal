import React, { useState, useEffect } from 'react';

const AddExamForm = () => {
    const [tituloExamen, setTituloExamen] = useState('');
    const [archivoPdf, setArchivoPdf] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/pacientes/')
            .then(response => response.json())
            .then(data => {
                setPacientes(data);
                setFilteredPacientes(data);
            })
            .catch(err => {
                console.error('Error fetching patients:', err);
                setError('Error al cargar pacientes');
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === '') {
            setFilteredPacientes(pacientes);
        } else {
            const filtered = pacientes.filter(paciente =>
                paciente.num_rut.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPacientes(filtered);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tituloExamen || !pacienteSeleccionado) {
            setError('Por favor, complete todos los campos');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('titulo_examen', tituloExamen);
        if (archivoPdf) {
            formData.append('archivo_pdf', archivoPdf);
        }
        formData.append('paciente', pacienteSeleccionado);

        try {
            const response = await fetch('http://localhost:8000/api/examenes/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo crear el examen');
            }

            const data = await response.json();
            alert('Examen creado con éxito');
            
            setTituloExamen('');
            setPacienteSeleccionado(null);
            setArchivoPdf(null);
            setSearchQuery('');
            setFilteredPacientes(pacientes);
        } catch (error) {
            console.error('Error creating exam:', error);
            setError('Hubo un problema al crear el examen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-exam-container">
            <h2>Agregar Examen</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo_examen">Título del Examen</label>
                    <input
                        type="text"
                        id="titulo_examen"
                        value={tituloExamen}
                        onChange={(e) => setTituloExamen(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="paciente_search">Paciente</label>
                    <input
                        type="text"
                        id="paciente_search"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="form-control"
                        placeholder="Escribe el RUT del paciente"
                    />
                    {filteredPacientes.length > 0 && (
                        <ul className="pacientes-list-form">
                            {filteredPacientes.map(paciente => (
                                <li
                                    key={paciente.id}
                                    onClick={() => setPacienteSeleccionado(paciente.id)}
                                    className={`paciente-item ${pacienteSeleccionado === paciente.id ? 'selected' : ''}`}
                                >
                                    {paciente.num_rut}-{paciente.dv_rut}: {paciente.primer_nombre} {paciente.apellido_paterno}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {pacienteSeleccionado && (
                    <div className="selected-paciente">
                        <strong>Paciente Seleccionado: </strong>
                        {filteredPacientes.find(p => p.id === pacienteSeleccionado)?.primer_nombre} {filteredPacientes.find(p => p.id === pacienteSeleccionado)?.apellido_paterno}
                    </div>
                )}

                <div className="form-group" id='form-group-file'>
                    <input
                        type="file"
                        id="archivo_pdf"
                        onChange={(e) => setArchivoPdf(e.target.files[0])}
                        className="form-control"
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creando examen...' : 'Crear Examen'}
                </button>
            </form>
        </div>
    );
};

export default AddExamForm;
