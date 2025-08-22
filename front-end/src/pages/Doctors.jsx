import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Alert from '../components/Alert';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', specialty: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
    } catch {
      setAlert({ type: 'error', message: 'Erro ao carregar médicos.' });
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, form);
        setAlert({ type: 'success', message: 'Médico atualizado com sucesso!' });
      } else {
        await api.post('/doctors', form);
        setAlert({ type: 'success', message: 'Médico adicionado com sucesso!' });
      }
      setForm({ name: '', specialty: '', phone: '' });
      setEditingId(null);
      fetchDoctors();
    } catch {
      setAlert({ type: 'error', message: 'Erro ao salvar médico.' });
    }
  };

  const handleEdit = doctor => {
    setForm({ name: doctor.name, specialty: doctor.specialty, phone: doctor.phone });
    setEditingId(doctor.id);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/doctors/${id}`);
      setAlert({ type: 'success', message: 'Médico excluído com sucesso!' });
      fetchDoctors();
    } catch {
      setAlert({ type: 'error', message: 'Erro ao excluir médico.' });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Médicos</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow rounded-lg p-6 flex flex-col gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Especialidade" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefone" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition">{editingId ? 'Salvar' : 'Adicionar'}</button>
      </form>
      <ul className="divide-y bg-white shadow rounded-lg">
        {doctors.map(d => (
          <li key={d.id} className="py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition">
            <span className="font-medium text-gray-800">{d.name}</span>
            <span className="text-gray-500">{d.specialty}</span>
            <span className="text-gray-500">{d.phone}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(d)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition">Editar</button>
              <button onClick={() => handleDelete(d.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
