import React, { useState, useRef } from 'react';
import { cloudinaryConfig, CLOUDINARY_UPLOAD_URL, ADMIN_PASSWORD } from '../config/cloudinary';
import './AdminUpload.css';

interface UploadedImage {
  url: string;
  publicId: string;
  fileName: string;
}

const AdminUpload: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    setError('');
    setUploading(true);

    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      setError('Por favor selecciona archivos de imagen válidos');
      setUploading(false);
      return;
    }

    const uploadPromises = imageFiles.map(file => uploadToCloudinary(file));

    try {
      const results = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...results]);
    } catch (err) {
      setError('Error al subir algunas imágenes. Por favor intenta de nuevo.');
      console.error(err);
    }

    setUploading(false);
  };

  const uploadToCloudinary = async (file: File): Promise<UploadedImage> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('folder', cloudinaryConfig.folder);
    formData.append('api_key', cloudinaryConfig.apiKey);
    // Add tag to identify gallery images
    formData.append('tags', 'lucia-gallery');
    // Add context for title
    formData.append('context', `title=${file.name.replace(/\.[^/.]+$/, '')}`);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      fileName: file.name,
    };
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setUploadedImages([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="login-box">
          <h1>Administración de Galería</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                autoFocus
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn-primary">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Subir Imágenes a la Galería</h1>
        <button onClick={handleLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>

      <div className="upload-section">
        <div
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <div className="dropzone-content">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="dropzone-text">
              Arrastra imágenes aquí o haz clic para seleccionar
            </p>
            <p className="dropzone-hint">
              Puedes subir múltiples imágenes a la vez
            </p>
          </div>
        </div>

        {uploading && (
          <div className="upload-status">
            <div className="spinner"></div>
            <p>Subiendo imágenes...</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {uploadedImages.length > 0 && (
          <div className="uploaded-images">
            <h2>Imágenes Subidas Exitosamente ({uploadedImages.length})</h2>
            <div className="images-grid">
              {uploadedImages.map((img, index) => (
                <div key={index} className="uploaded-image-card">
                  <img src={img.url} alt={img.fileName} />
                  <p className="image-name">{img.fileName}</p>
                </div>
              ))}
            </div>
            <p className="success-message">
              ✓ ¡Listo! Las imágenes aparecerán en la galería inmediatamente.
            </p>
            <p className="info-message" style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              Ve a la página de Galería para ver tus imágenes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpload;
