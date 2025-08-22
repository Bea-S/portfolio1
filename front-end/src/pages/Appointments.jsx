import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Alert from '../components/Alert';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientId: '', doctorId: '', date: '', reason: '' });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments');
      setAppointments(res.data);
    } catch {
      setAlert({ type: 'error', message: 'Erro ao carregar consultas.' });
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/appointments/${editingId}`, form);
        setAlert({ type: 'success', message: 'Consulta atualizada com sucesso!' });
      } else {
        await api.post('/appointments', form);
        setAlert({ type: 'success', message: 'Consulta agendada com sucesso!' });
      }
      setForm({ patientId: '', doctorId: '', date: '', reason: '' });
      setEditingId(null);
      fetchAppointments();
    } catch {
      setAlert({ type: 'error', message: 'Erro ao salvar consulta.' });
    }
  };

  const handleEdit = appointment => {
    setForm({ patientId: appointment.patientId, doctorId: appointment.doctorId, date: appointment.date, reason: appointment.reason });
    setEditingId(appointment.id);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/appointments/${id}`);
      setAlert({ type: 'success', message: 'Consulta cancelada com sucesso!' });
      fetchAppointments();
    } catch {
      setAlert({ type: 'error', message: 'Erro ao cancelar consulta.' });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Consultas</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow rounded-lg p-6 flex flex-col gap-4">
        <input name="patientId" value={form.patientId} onChange={handleChange} placeholder="ID do Paciente" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="doctorId" value={form.doctorId} onChange={handleChange} placeholder="ID do Médico" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Data" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="reason" value={form.reason} onChange={handleChange} placeholder="Motivo" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition">{editingId ? 'Salvar' : 'Agendar'}</button>
      </form>
      <ul className="divide-y bg-white shadow rounded-lg">
        {appointments.map(a => (
          <li key={a.id} className="py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition">
            <span className="font-medium text-gray-800">{a.patientId}</span>
            <span className="text-gray-500">{a.doctorId}</span>
            <span className="text-gray-500">{a.date}</span>
            <span className="text-gray-500">{a.reason}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(a)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition">Editar</button>
              <button onClick={() => handleDelete(a.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Cancelar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
