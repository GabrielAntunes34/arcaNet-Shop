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
    // sends an error if the backend sends a response with 4xx/5xx
    throw new Error(`Erro ${resp.status}: ${await resp.text()}`);
  }

  // makes the response a JSON (id already comes as a string)
  return resp.json();
}

const makeLogin = async (email, password) => {
  console.log(password);

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify({ email:email, password:password })
    });

    if (!response.ok) {
      // If the response is not ok (404 for invalid credentials, 500 for server error)
// Returns null to indicate login failure
      return null;
    }

    const dados = await response.json();
    
    // Treat '$' as empty string for address and phone
    if (dados.data) {
      if (dados.data.address === '$') dados.data.address = '';
      if (dados.data.phone === '$') dados.data.phone = '';
    }
    
    return dados.data;
  } catch (error) {
    // If there is a network error or other error, also return null
    console.error('Erro no login:', error);
    return null;
  }
};

const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:3000/user/me', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      return null;
    }

    const dados = await response.json();
    
    // Treat '$' as empty string for address and phone
    if (dados.data) {
      if (dados.data.address === '$') dados.data.address = '';
      if (dados.data.phone === '$') dados.data.phone = '';
    }
    
    return dados.data;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return null;
  }
};

export {
  makeLogin,
  makeRegister,
  checkAuth
};