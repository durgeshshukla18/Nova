import Transaction from "../models/transaction";



const plans = [
    {id: 1, name: "Basic", credits: 100, price: 5, features: ["Access to basic features", "100 credits", "Email support"]},
    {id: 2, name: "Standard", credits: 250, price: 10, features: ["Access to standard features", "250 credits", "Priority email support", "Access to community"]},
    {id: 3, name: "Premium", credits: 600, price: 20, features: ["Access to all features", "600 credits", "24/7 Support", "Access to community", "Monthly webinars"]},
]

// API controller for getting all plans
export const getPlans = async(req, res) => {
    try {
        res.json({success: true, plans});
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }
}

// API controller for purchasing a plan
export const purchasePlan = async(req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;
        const plan = plans.find(plan => plan._id === planId);
        if(!plan){
            return res.json({success: false, message: "Invalid Plan"});
        }

        // Create new Transaction
        const transaction = await Transaction.create({
            userId: userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        })

        
    } catch (error) {
        
    }
}