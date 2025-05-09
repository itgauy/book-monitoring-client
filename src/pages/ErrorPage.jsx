import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black !text-white p-6">
      <div className="max-w-2xl w-full">
        {/* Vercel-like logo */}
        <svg width="120" height="30" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
        </svg>

        <div className="border border-gray-800 rounded-md p-6 bg-gray-900">
          <div className="flex items-center mb-6">
            <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold !text-white">This deployment is suspended</h1>
          </div>

          <p className="!text-gray-400 mb-4">
            This deployment has been suspended due to potential malicious activity.
            Our systems have detected behavior that violates our terms of service.
          </p>

          <div className="bg-gray-950 p-4 rounded-md border border-gray-800 mb-6">
            <h2 className="text-sm font-semibold mb-2 !text-gray-300">Reason for suspension:</h2>
            <ul className="list-disc pl-4 !text-gray-400 text-sm space-y-1">
              <li>Malicious or suspicious activity detected</li>
              <li>Violation of platform security policies</li>
              <li>Automated suspicious traffic originating from this deployment</li>
            </ul>
          </div>

          <p className="!text-gray-400 mb-6">
            If you believe this is an error, please contact support with your deployment details.
            Reference ID: <span className="font-mono bg-gray-800 px-2 py-1 rounded text-xs !text-white">dpmt_8f72e951 ITS A PRANKKK</span>
          </p>

          <div className="border-t border-gray-800 pt-6 mt-6 flex justify-between items-center">
            <Link
              to="https://vercel.com"
              className="px-4 py-2 bg-white !text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors"
            >
              Return to Dashboard
            </Link>

            <a
              href="#"
              className="text-sm !text-gray-400 hover:!text-white transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Contact Support →
            </a>
          </div>
        </div>

        <div className="mt-8 text-center !text-gray-500 text-sm">
          © {new Date().getFullYear()} Vercel, Inc.
        </div>
      </div>
    </div>
  )
}

export default ErrorPage