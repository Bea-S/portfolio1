import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', specialty: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
      setError('');
      setStatus(res.status);
    } catch (err) {
      setError('Erro ao carregar médicos');
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
        res = await api.put(`/doctors/${editingId}`, form);
        setSuccess('Médico atualizado com sucesso!');
      } else {
        res = await api.post('/doctors', form);
        setSuccess('Médico adicionado com sucesso!');
      }
      setStatus(res.status);
      setForm({ name: '', specialty: '' });
      setEditingId(null);
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar médico');
      setStatus(err.response?.status);
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleEdit = doctor => {
    setForm({ name: doctor.name, specialty: doctor.specialty });
    setEditingId(doctor.id);
    setSuccess('');
    setError('');
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      const res = await api.delete(`/doctors/${id}`);
      setSuccess('Médico excluído!');
      setStatus(res.status);
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir médico');
      setStatus(err.response?.status);
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get(`/doctors/${searchId}`);
      setSearchResult(res.data);
      setError('');
      setStatus(res.status);
    } catch (err) {
      setSearchResult(null);
      setError(err.response?.data?.error || 'Médico não encontrado');
      setStatus(err.response?.status);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-blue-700 text-center">Médicos</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 bg-white shadow-lg rounded p-6 border border-blue-100">
        <div className="flex gap-2 flex-col md:flex-row">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="border p-2 rounded w-full" required />
          <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Especialidade" className="border p-2 rounded w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full font-semibold">{editingId ? 'Atualizar' : 'Adicionar'}</button>
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
          <strong>Médico encontrado:</strong> {searchResult.name} - {searchResult.specialty}
        </div>
      )}
      <ul className="divide-y bg-white shadow-lg rounded border border-blue-100">
        {doctors.map(d => (
          <li key={d.id} className="py-2 flex justify-between items-center px-2 hover:bg-blue-50 transition">
            <div className="flex-1 flex items-center">
              <span className="font-medium text-lg">{d.name} - {d.specialty}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(d)} className="text-yellow-600 hover:underline">Editar</button>
              <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
