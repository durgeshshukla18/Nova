import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Loading() {

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#242124] to-[#000000] backdrop-opacity-50 flex items-center justify-center h-screen w-screen text-white text-2xl">
      <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin">

      </div>

    </div>
  );
}

export default Loading