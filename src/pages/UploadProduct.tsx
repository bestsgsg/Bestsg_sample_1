import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, X } from 'lucide-react';
import logo from '@/assets/logo1.png';

const UploadProduct: React.FC = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    if (!selectedFile) {
      setMessage('Please select an image file.');
      return;
    }

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageId = uploadRes.data.image.id;

      // 2. Create product with imageId
      const productData = {
        description,
        type,
        price,
        imageId,
      };

      const productRes = await axios.post('http://localhost:5000/api/products', productData);

      setMessage('Product uploaded successfully!');
      console.log('Product created:', productRes.data);

      // Clear form
      setDescription('');
      setType('');
      setPrice(0);
      setSelectedFile(null);
    } catch (error) {
      setMessage('Error uploading product.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-sm mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Best SG" className="h-8 w-auto" />
            <span className="font-extrabold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Best SG
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Page</span>
            </Link>
            <Link
              to="/admin/dashboard"
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Upload New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Type
              </label>
              <input
                type="text"
                id="type"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
            <div className="pt-2 flex items-center justify-between">
              <Link
                to="/"
                className="text-xs font-bold text-slate-500 hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cancel / Return</span>
              </Link>
              <button
                type="submit"
                className="hero-button text-xs font-bold py-2.5 px-6"
              >
                Send
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-xs font-semibold text-emerald-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
