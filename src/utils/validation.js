import { z, ZodError } from 'zod';


export const createAccountSchema = z.object({
    owner: z.string().min(3, "Owner name must be at least 3 characters").max(50)
});


export const transactionSchema = z.object({
    account_id: z.string().uuid("Invalid Account ID format"),
    amount: z.number().positive("Amount must be positive").min(1, "Minimum amount is 1")
});


export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.log("Validation Error:", error);
        const message = error.issues?.[0]?.message || "Invalid input data";
        res.status(400).json({ error: message });
    }
};