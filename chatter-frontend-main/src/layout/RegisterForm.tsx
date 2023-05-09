import Link from 'next/link';
import { useRef, useState } from 'react';
import FormData from 'form-data';

import { RegisterData } from '../types/register';
import Field from '../components/Home/Field';
import { useRouter } from 'next/router';
import { NotificationFailure, NotificationSuccess } from '../components/Notifications';
import apiClient from '../utils/client';

function Register() {
  const initialValues: RegisterData = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  };

  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [formData, setFormData] = useState<RegisterData>(initialValues);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const data = new FormData();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileClick = () => {
    if (hiddenFileInput.current != null) {
      hiddenFileInput.current.click();
    }
  };

  const handleRegister = () => {
    data.append('image', selectedImage);
    data.append('name', formData.name);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    /* 
      TODO: 
      1. Make a new user
      2. Display a sucess notification (or error).
    */
    apiClient
      .post('/signup', data)
      .then((response) => {
        router.push('/');
        NotificationSuccess(response.data.message);
      })
      .catch((error) => NotificationFailure(error.response.data.message));
  };

  return (
    <div
      id="register"
      className="right-side d-flex flex-column justify-content-start w-50 bg-chatter-green h-100 py-4 fs-1 fw-bold scroll-y"
    >
      <Field
        title="NOMBRE"
        type="text"
        name="name"
        placeholder="Ingresa tu nombre"
        onChange={handleInputChange}
      />

      <Field
        title="APELLIDO"
        type="text"
        name="lastName"
        placeholder="Ingresa tu apellido"
        onChange={handleInputChange}
      />

      <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-4" data-aos="fade">
        <span>FOTO DE PERFIL</span>
        <label className="file">
          <button className="btn btn-input-file" onClick={handleFileClick}>
            Seleccionar Archivo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>
      </div>

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-3 d-flex align-items-start" data-aos="fade">
        <button className="btn btn-primary" onClick={handleRegister}>
          Registrarse
        </button>
      </div>

      <div className="content text d-flex flex-row gap-2 fs-6 fst-italic" data-aos="fade">
        <span>¿Ya tienes una cuenta?</span>
        <Link href="/" className="text-chatter-blue">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}

export default Register;
