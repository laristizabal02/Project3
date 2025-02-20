import React, { useState } from "react";

interface StudentFormProps {
  onSubmit: (name: string, grade_name: string) => Promise<void>;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [gradeName, setGradeName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && gradeName) {
      onSubmit(name, gradeName);
      setName(""); // Clear form fields
      setGradeName("");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="grade">Grade Name:</label>
        <input
          id="grade"
          type="text"
          value={gradeName}
          onChange={(e) => setGradeName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;