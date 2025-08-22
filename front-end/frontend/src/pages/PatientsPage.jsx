import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', cpf: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
      setError('');
      setStatus(res.status);
    } catch (err) {
      setError('Erro ao carregar pacientes');
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
        res = await api.put(`/patients/${editingId}`, form);
        setSuccess('Paciente atualizado com sucesso!');
      } else {
        res = await api.post('/patients', form);
        setSuccess('Paciente adicionado com sucesso!');
      }
      setStatus(res.status);
      setForm({ name: '', age: '', cpf: '' });
      setEditingId(null);
      fetchPatients();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar paciente');
      setStatus(err.response?.status);
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleEdit = patient => {
    setForm({ name: patient.name, age: patient.age, cpf: patient.cpf });
    setEditingId(patient.id);
    setSuccess('');
    setError('');
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      const res = await api.delete(`/patients/${id}`);
      setSuccess('Paciente excluído!');
      setStatus(res.status);
      fetchPatients();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir paciente');
      setStatus(err.response?.status);
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get(`/patients/${searchId}`);
      setSearchResult(res.data);
      setError('');
      setStatus(res.status);
    } catch (err) {
      setSearchResult(null);
      setError(err.response?.data?.error || 'Paciente não encontrado');
      setStatus(err.response?.status);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 text-blue-700 text-center">Pacientes</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 bg-white shadow-lg rounded p-6 border border-blue-100">
        <div className="flex gap-2 flex-col md:flex-row">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="border p-2 rounded w-full" required />
          <input name="age" value={form.age} onChange={handleChange} placeholder="Idade" className="border p-2 rounded w-full" required type="number" min="0" />
          <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" className="border p-2 rounded w-full" required maxLength={14} />
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
          <strong>Paciente encontrado:</strong> {searchResult.name} - {searchResult.age} anos - CPF: {searchResult.cpf}
        </div>
      )}
      <ul className="divide-y bg-white shadow-lg rounded border border-blue-100">
        {patients.map(p => (
          <li key={p.id} className="py-2 flex justify-between items-center px-2 hover:bg-blue-50 transition">
            <div className="flex-1 flex items-center">
              <span className="font-medium text-lg">{p.name} - {p.age} anos - CPF: {p.cpf}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-yellow-600 hover:underline">Editar</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
