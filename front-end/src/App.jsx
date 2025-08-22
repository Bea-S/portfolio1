import { useState } from "react";
import { User, Lock } from "lucide-react"; // ícones

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Bem-vindo, ${data.username || "usuário"}!`);
      } else {
        setMessage(`❌ ${data.message || "Usuário ou senha incorretos."}`);
      }
    } catch {
      setMessage("⚠️ Erro ao conectar com o servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Usuário */}
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Mensagem */}
        {message && (
          <p className="text-center mt-6 font-medium text-sm text-gray-700">
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          Esqueceu sua senha?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Recuperar
          </a>
        </p>
      </div>
    </div>
  );
}
