import { useState, useEffect } from "react";
import Loading from "./Loading";



function Community() {

  const[images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async() => {
    setImages([
      "./images/delete.png",
      "./images/NovaLogo.png",
      "./images/logout.png"
    ]);
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  if(loading) return <Loading />;

  return (
    <div className="Community p-6 pt-12 xl:px-12 2xl:px-24 w-full mx-auto h-full">
      <h2 className="text-xl font-semibold mb-6 text-grayy-600 dark:text-purple-100">Community</h2>

      
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
              <img src={src} alt={`Community ${index + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No images available.</p>
      )}

    </div>
  )
}

export default Community