import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(isLogin ? 'Login erfolgreich!' : 'Registrierung erfolgreich! Bitte E-Mail bestätigen.');
      if (isLogin) router.push('/');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', fontFamily: 'Arial' }}>
      <h2>{isLogin ? 'Login' : 'Registrieren'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>
          {isLogin ? 'Login' : 'Registrieren'}
        </button>
      </form>
      <p style={{ marginTop: 20, color: 'green' }}>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: 10 }}>
        {isLogin ? 'Noch keinen Account? Jetzt registrieren' : 'Schon einen Account? Jetzt einloggen'}
      </button>
    </div>
  );
}
