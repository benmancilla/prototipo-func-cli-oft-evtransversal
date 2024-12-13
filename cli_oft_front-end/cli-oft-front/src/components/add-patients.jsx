import React, { useState, useEffect } from 'react';

const AddPatientForm = () => {
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [numRut, setNumRut] = useState('');
    const [dvRut, setDvRut] = useState('');
    const [sistSalud, setSistSalud] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [patients, setPatients] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!primerNombre || !apellidoPaterno || !numRut || !dvRut || !sistSalud) {
            setError('Por favor, complete todos los campos');
            return;
        }

        if (numRut.length > 9) {
            setError('El RUT debe tener un máximo de 9 caracteres');
            return;
        }

        if (dvRut.length !== 1) {
            setError('El dígito verificador debe ser de un solo carácter');
            return;
        }

        if (sistSalud !== '1' && sistSalud !== '2') {
            setError('El sistema de salud debe ser 1 o 2');
            return;
        }

        setLoading(true);
        setError('');

        const patientData = {
            primer_nombre: primerNombre,
            segundo_nombre: segundoNombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            num_rut: numRut,
            dv_rut: dvRut,
            sist_salud: sistSalud, 
        };

        try {
            const response = await fetch('http://localhost:8000/api/pacientes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(patientData),
            });

            if (!response.ok) {
                throw new Error('No se pudo crear el paciente');
            }

            const data = await response.json();
            alert('Paciente creado con éxito');

            setPrimerNombre('');
            setSegundoNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setNumRut('');
            setDvRut('');
            setSistSalud('');
            fetchPatients();
        } catch (err) {
            console.error('Error creating patient:', err);
            setError('Hubo un problema al crear el paciente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-patient-container">
            <h2>Agregar Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="primer_nombre">Primer Nombre</label>
                    <input
                        type="text"
                        id="primer_nombre"
                        value={primerNombre}
                        onChange={(e) => setPrimerNombre(e.target.value)}
                        className="form-control"
                        required
                    />

                    <label htmlFor="segundo_nombre">Segundo Nombre</label>
                    <input
                        type="text"
                        id="segundo_nombre"
                        value={segundoNombre}
                        onChange={(e) => setSegundoNombre(e.target.value)}
                        className="form-control"
                    />

                    <label htmlFor="apellido_paterno">Apellido Paterno</label>
                    <input
                        type="text"
                        id="apellido_paterno"
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                        className="form-control"
                        required
                    />

                    <label htmlFor="apellido_materno">Apellido Materno</label>
                    <input
                        type="text"
                        id="apellido_materno"
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                        className="form-control"
                    />

                    <label htmlFor="num_rut">Número de RUT</label>
                    <input
                        type="text"
                        id="num_rut"
                        value={numRut}
                        onChange={(e) => setNumRut(e.target.value.slice(0, 9))}
                        className="form-control"
                        required
                        maxLength="8"
                    />

                    <label htmlFor="dv_rut">Dígito Verificador</label>
                    <input
                        type="text"
                        id="dv_rut"
                        value={dvRut}
                        onChange={(e) => setDvRut(e.target.value.slice(0, 1))}
                        className="form-control"
                        required
                        maxLength="1"
                    />

                    <label htmlFor="sist_salud">Sistema de Salud</label>
                    <input
                        type="number"
                        id="sist_salud"
                        value={sistSalud}
                        onChange={(e) => setSistSalud(e.target.value)}
                        className="form-control"
                        required
                        min="1"
                        max="2"
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creando paciente...' : 'Crear Paciente'}
                </button>
            </form>
        </div>
    );
};

export default AddPatientForm;
