import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth"; // Import AuthService to handle token storage

// Function to send a POST request to the '/auth/login' endpoint with user login information
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const { token, roleTypeId } = await response.json();

    // Store the token in localStorage using AuthService
    AuthService.login(token);

    // Return the roleTypeId for further redirection logic
    return roleTypeId;
  } catch (err) {
    console.error('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };