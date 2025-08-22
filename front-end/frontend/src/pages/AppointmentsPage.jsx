import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientId: '', doctorId: '', date: '', reason: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/appointments');
      setAppointments(res.data);
      setError('');
      setStatus(res.status);
    } catch (err) {
      setError('Erro ao carregar consultas');
      setStatus(err.response?.status);
    }
    setLoading(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (editingId) {
        res = await api.put(`/appointments/${editingId}`, form);
        setSuccess('Consulta atualizada com sucesso!');
      } else {
        res = await api.post('/appointments', form);
        setSuccess('Consulta agendada com sucesso!');
      }
      setStatus(res.status);
      setForm({ patientId: '', doctorId: '', date: '', reason: '' });
      setEditingId(null);
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar consulta');
      setStatus(err.response?.status);
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleEdit = appointment => {
    setForm({ patientId: appointment.patientId, doctorId: appointment.doctorId, date: appointment.date, reason: appointment.reason });
    setEditingId(appointment.id);
    setSuccess('');
    setError('');
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      const res = await api.delete(`/appointments/${id}`);
      setSuccess('Consulta cancelada!');
      setStatus(res.status);
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cancelar consulta');
      setStatus(err.response?.status);
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get(`/appointments/${searchId}`);
      setSearchResult(res.data);
      setError('');
      setStatus(res.status);
    } catch (err) {
      setSearchResult(null);
      setError(err.response?.data?.error || 'Consulta não encontrada');
      setStatus(err.response?.status);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-blue-700 text-center">Consultas</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 bg-white shadow-lg rounded p-6 border border-blue-100">
        <div className="flex gap-2 flex-col md:flex-row">
          <input name="patientId" value={form.patientId} onChange={handleChange} placeholder="ID do Paciente" className="border p-2 rounded w-full" required type="number" min="0" />
          <input name="doctorId" value={form.doctorId} onChange={handleChange} placeholder="ID do Médico" className="border p-2 rounded w-full" required type="number" min="0" />
          <input name="date" value={form.date} onChange={handleChange} placeholder="Data" className="border p-2 rounded w-full" required type="date" />
          <input name="reason" value={form.reason} onChange={handleChange} placeholder="Motivo" className="border p-2 rounded w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full font-semibold">{editingId ? 'Atualizar' : 'Agendar'}</button>
        {loading && <span className="text-gray-500">Carregando...</span>}
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">{success}</span>}
        {status && <span className="text-xs text-gray-400">Status HTTP: {status}</span>}
      </form>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2 items-center justify-center">
        <input type="number" value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Buscar por ID" className="border p-2 rounded" />
        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Buscar</button>
      </form>
      {searchResult && (
        <div className="mb-4 p-2 bg-blue-50 rounded shadow text-center text-lg">
          <strong>Consulta encontrada:</strong> Paciente {searchResult.patientId} - Médico {searchResult.doctorId} - {searchResult.date} - {searchResult.reason}
        </div>
      )}
      <ul className="divide-y bg-white shadow-lg rounded border border-blue-100">
        {appointments.map(a => (
          <li key={a.id} className="py-2 flex justify-between items-center px-2 hover:bg-blue-50 transition">
            <div className="flex-1 flex items-center">
              <span className="font-medium text-lg">Paciente {a.patientId} - Médico {a.doctorId} - {a.date} - {a.reason}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(a)} className="text-yellow-600 hover:underline">Editar</button>
              <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline">Cancelar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
