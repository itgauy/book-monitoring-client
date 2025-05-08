import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;

const Delete = () => {
  const [loading, setLoading] = useState({
    books: false,
    borrowers: false,
    logs: false
  });

  const handleDeleteBooks = async () => {
    const result = await Swal.fire({
      title: 'Delete All Books',
      text: 'Are you sure you want to delete ALL books? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete all books',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    setLoading(prev => ({ ...prev, books: true }));
    try {
      const confirmResult = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Type "DELETE" to confirm deletion of ALL books',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
          if (text !== 'DELETE') {
            Swal.showValidationMessage('You must type DELETE to confirm');
            return false;
          }
          return true;
        },
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (!confirmResult.isConfirmed) return;

      const response = await axios.delete(`${API_URL}/delete/books`);

      Swal.fire({
        title: 'Success!',
        text: `${response.data.message}`,
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      console.error('Error deleting books:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete books',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(prev => ({ ...prev, books: false }));
    }
  };

  const handleDeleteBorrowers = async () => {
    const result = await Swal.fire({
      title: 'Delete All Borrowers',
      text: 'Are you sure you want to delete ALL borrowers? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete all borrowers',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    setLoading(prev => ({ ...prev, borrowers: true }));
    try {
      const confirmResult = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Type "DELETE" to confirm deletion of ALL borrowers',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
          if (text !== 'DELETE') {
            Swal.showValidationMessage('You must type DELETE to confirm');
            return false;
          }
          return true;
        },
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (!confirmResult.isConfirmed) return;

      const response = await axios.delete(`${API_URL}/delete/borrowers`);

      Swal.fire({
        title: 'Success!',
        text: `${response.data.message}`,
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      console.error('Error deleting borrowers:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete borrowers',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(prev => ({ ...prev, borrowers: false }));
    }
  };

  const handleDeleteLogs = async () => {
    const result = await Swal.fire({
      title: 'Delete All Logs',
      text: 'Are you sure you want to delete ALL logs? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete all logs',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    setLoading(prev => ({ ...prev, logs: true }));
    try {
      const confirmResult = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Type "DELETE" to confirm deletion of ALL logs',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
          if (text !== 'DELETE') {
            Swal.showValidationMessage('You must type DELETE to confirm');
            return false;
          }
          return true;
        },
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (!confirmResult.isConfirmed) return;

      const response = await axios.delete(`${API_URL}/delete/logs`);

      Swal.fire({
        title: 'Success!',
        text: `${response.data.message}`,
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      console.error('Error deleting logs:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete logs',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(prev => ({ ...prev, logs: false }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-6">Delete Data</h1>
      <div className="w-full mb-10">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                Warning: These actions will permanently delete all data and cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleDeleteBooks}
            disabled={loading.books}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-300"
          >
            {loading.books ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Delete All Books'
            )}
          </button>

          <button
            onClick={handleDeleteBorrowers}
            disabled={loading.borrowers}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-300"
          >
            {loading.borrowers ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Delete All Borrowers'
            )}
          </button>

          <button
            onClick={handleDeleteLogs}
            disabled={loading.logs}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-300"
          >
            {loading.logs ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Delete All Logs'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;