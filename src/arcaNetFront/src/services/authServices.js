const apiUrl = import.meta.env.API_BASE_URL;
console.log(apiUrl);

const makeRegister = async (user) => {
    console.log(user);
    const resp = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (!resp.ok) {
    // lança erro caso o backend responda com 4xx/5xx
    throw new Error(`Erro ${resp.status}: ${await resp.text()}`);
  }

  // converte a resposta em JSON (id já virá como string)
  return resp.json();
}

const makeLogin = async (email, senha) => {
  console.log(senha);

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // ⚠️ ESSENCIAL para lidar com cookies
    body: JSON.stringify({ email:email, password:senha })
  });

  if (!response.ok) {
    throw new Error('Falha no login');
  }

  const dados = await response.json();
  return dados.data;
};

export {
  makeLogin,
  makeRegister
};