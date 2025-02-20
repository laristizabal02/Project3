import { Form, Button } from 'react-bootstrap';
import { useState, FormEvent, ChangeEvent } from "react";
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";
import { useNavigate } from "react-router-dom";


//import { Prev } from 'react-bootstrap/esm/PageItem';


const Login: React.FC = () => {
  const [role_type_id, setRole] = useState<'instructor' | 'parent' | null>('instructor');
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
    role_type_id: 'instructor' // Default role
  });
  let navigate = useNavigate();
  // Handle input changes for the login form
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle role selection
  const handleRoleSelection = (selectedRole: 'instructor' | 'parent') => {
    setRole(selectedRole);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const roleNumber = role_type_id === 'instructor' ? 1 : 2;
  
    try {
      const updatedLoginData = {
        ...loginData,
        role_type_id: roleNumber.toString(),
      };
  
      const roleTypeId = await login(updatedLoginData);
  
      // Display a success alert
      alert('Login successful! Redirecting to your dashboard...');
  
      // Redirect based on roleTypeId
      if (roleTypeId === 1) {
        navigate('/instructor');
      } else if (roleTypeId === 2) {
        navigate('/parent');
      }
    } catch (err) {
      console.error('Failed to login', err);
      alert('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="card p-4">
      <h2>Select Role</h2>
      <div className="mb-3">
        <Button
          variant={role_type_id === 'instructor' ? 'primary' : 'outline-primary'}
          className="me-2"
          onClick={() => handleRoleSelection('instructor')}
        >
          Instructor
        </Button>
        <Button
          variant={role_type_id === 'parent' ? 'primary' : 'outline-primary'}
          onClick={() => handleRoleSelection('parent')}
        >
          Parent/Guardian
        </Button>
      </div>

      {role_type_id && <h3>Login as {role_type_id === 'instructor' ? 'Instructor' : 'Parent/Guardian'}</h3>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;