'use client'

import React, { useState } from 'react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: ''
    };

    if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido.';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
      isValid = false;
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Você deve aceitar os termos e condições.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
        console.log('Formulário válido:', formData);
        
        // Fazer a requisição para o servidor
        fetch('http://localhost:3002/register', {
            method: 'POST', // método HTTP
            headers: {
                'Content-Type': 'application/json', // tipo de conteúdo
            },
            body: JSON.stringify(formData), // dados convertidos para JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json(); // converte a resposta para JSON
        })
        .then(data => {
            // A resposta do servidor é tratada aqui
            console.log('Resposta do servidor:', data);
            // Aqui você pode, por exemplo, limpar o formulário ou redirecionar o usuário
        })
        .catch(error => {
            // Lida com erros na requisição
            console.error('Erro ao enviar os dados:', error);
        });
    }
};


  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Registrar Conta</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar Senha</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            style={styles.input}
          />
          {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              style={styles.checkbox}
            />
            Aceitar os termos e condições
          </label>
          {errors.termsAccepted && <p style={styles.error}>{errors.termsAccepted}</p>}
        </div>

        <button type="submit" style={styles.button}>Registrar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as 'center',
    background: 'linear-gradient(135deg, #89fffd, #ef32d9)',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    marginTop: '100px'
  },
  header: {
    color: '#fff',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px',
  },
  input: {
    color: 'black',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  checkbox: {
    marginRight: '10px',
  }
};

export default Register;
