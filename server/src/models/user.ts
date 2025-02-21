// Require schema and model from mongoose
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
 }

// Construct a new instance of the schema class
const userSchema = new Schema<IUser>({
  // Configure individual properties using Schema Types
name: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true, lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  password: {type: String, required: true, minlength: 8},
  createdAt: {
    type: Date,
    default: Date.now
  }
})
userSchema.pre('save', async function(next) {
  try {
    // Check if the password has been modified
    if (!this.isModified('password')) return next();
    
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next(); // Proceed to save
  } catch (error: unknown) {
    next(error as Error); // Pass any errors to the next middleware
  }
});
// Using model() to compile a model based on the schema 'userSchema'
const User = model('user', userSchema);

export default User;

