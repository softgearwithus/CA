import React, { useState } from 'react';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';

const dummyDownloads = Array(10).fill({
  act: 'Company Act',
  section: 'Section 184',
  form: 'MBP 1',
  fileUrl: '/path/to/MBP1.pdf', // Replace with real file URL
});

const DownloadSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadClick = (file) => {
    setSelectedFile(file);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('User Info:', userData);

    // Trigger download
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = selectedFile.fileUrl;
      link.download = selectedFile.form + '.pdf';
      link.click();
    }

    // Reset
    setShowForm(false);
    setUserData({ name: '', email: '', mobile: '' });
    setSelectedFile(null);
  };

  // Filter downloads based on search query
  const filteredDownloads = dummyDownloads.filter((item) =>
    [item.act, item.section, item.form]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <BottomNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Downloads</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by Act, Section or Form..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <div className="grid grid-cols-1 gap-4">
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between items-center bg-amber-300 p-4 rounded-md shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:gap-6 items-center mb-2 sm:mb-0">
                  <span className="font-medium">{item.act}</span>
                  <span className="text-gray-700">{item.section}</span>
                  <span className="text-gray-800 font-semibold">{item.form}</span>
                </div>
                <button
                  onClick={() => handleDownloadClick(item)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Download
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
              <h3 className="text-xl font-bold mb-4">Enter your details</h3>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={userData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={userData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Your Mobile Number"
                  value={userData.mobile}
                  onChange={handleFormChange}
                  required
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit mobile number"
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
                  >
                    Submit & Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DownloadSection;
