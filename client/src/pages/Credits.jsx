import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext';


function Credits() {

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true);
  const {token, axios} = useAppContext();

  const fetchPlans = async() => {
    // try {
    //   const { data } = await axios.get('/api/credit/plan', {headers: {Authorization: token}});
    //   if(data.success){
    //     setPlans(data.plans);
    //   }else{
    //     toast.error(data.message || "Failed to fetch plans");
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
    // setLoading(false);

    // Dummy plans...
    setPlans([
      {id: 1, name: "Basic", credits: 100, price: 5, features: ["Access to basic features", "100 credits", "Email support"]},
      {id: 2, name: "Standard", credits: 250, price: 10, features: ["Access to standard features", "250 credits", "Priority email support", "Access to community"]},
      {id: 3, name: "Premium", credits: 600, price: 20, features: ["Access to all features", "600 credits", "24/7 Support", "Access to community", "Monthly webinars"]},
    ]);
    setLoading(false);
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  if(loading) return <Loading />;


  return (
    <div className="Credits max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className='text-3xl font-semibold text0centre mb-10 xl:mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 ${plan.name === 'Premium' ? 'bg-purple-50 dark:bg-purple-900' : 'bg-white dark:bg-gray-800'}`}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{plan.credits} Credits</p>
              <p className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">${plan.price}</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                Buy Now
              </button>
              
                <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-4'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300 mt-2"> {feature}</li>
                  ))}
                </ul>
              
            </div>
          ))}
        </div>
    </div>
  )
}

export default Credits