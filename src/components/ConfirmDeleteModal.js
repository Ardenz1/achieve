// components/ConfirmDeleteModal.js
const ConfirmDeleteModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 text-center">
          <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this entry?</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmDeleteModal;
  