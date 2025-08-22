import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Alert from '../components/Alert';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', birthDate: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch {
      setAlert({ type: 'error', message: 'Erro ao carregar pacientes.' });
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/patients/${editingId}`, form);
        setAlert({ type: 'success', message: 'Paciente atualizado com sucesso!' });
      } else {
        await api.post('/patients', form);
        setAlert({ type: 'success', message: 'Paciente adicionado com sucesso!' });
      }
      setForm({ name: '', birthDate: '', phone: '' });
      setEditingId(null);
      fetchPatients();
    } catch {
      setAlert({ type: 'error', message: 'Erro ao salvar paciente.' });
    }
  };

  const handleEdit = patient => {
    setForm({ name: patient.name, birthDate: patient.birthDate, phone: patient.phone });
    setEditingId(patient.id);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/patients/${id}`);
      setAlert({ type: 'success', message: 'Paciente excluído com sucesso!' });
      fetchPatients();
    } catch {
      setAlert({ type: 'error', message: 'Erro ao excluir paciente.' });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Pacientes</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow rounded-lg p-6 flex flex-col gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="birthDate" value={form.birthDate} onChange={handleChange} placeholder="Data de Nascimento" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefone" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition">{editingId ? 'Salvar' : 'Adicionar'}</button>
      </form>
      <ul className="divide-y bg-white shadow rounded-lg">
        {patients.map(p => (
          <li key={p.id} className="py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition">
            <span className="font-medium text-gray-800">{p.name}</span>
            <span className="text-gray-500">{p.birthDate}</span>
            <span className="text-gray-500">{p.phone}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition">Editar</button>
              <button onClick={() => handleDelete(p.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
