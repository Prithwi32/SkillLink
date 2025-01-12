import React from 'react';
import { X } from 'lucide-react';

const ReportModal = ({ isOpen, onClose, user, reasons, isReasonsLoading }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Reports for {user.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!isReasonsLoading && reasons.map((report, index) => (
            <div
              key={index}
              className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={report.reportedBy.photo==""?"https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg":report.reportedBy.photo}
                  alt={report.reportedBy.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">
                    {report.reportedBy.name}
                  </h3>
                  <p className="text-sm text-gray-500">{report.dateReported.slice(0,10)}</p>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{report.reason}</p>
            </div>
          ))}
          {isReasonsLoading && (
            <div className="p-6 text-center text-slate-500">
              <p>Loading reports...</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
