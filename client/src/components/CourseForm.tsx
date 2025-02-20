import React, { useState } from "react";
import { Department } from "../interfaces/DepartmentInt";

interface CourseFormProps {
  onSubmit: (title: string, department_id: number) => void;
  departments: Department[];
}

const CourseForm: React.FC<CourseFormProps> = ({ departments, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [department_id, setDepartmentId] = useState<number>(departments[0]?.department_id || 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(title, department_id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Department:</label>
        <select
          value={department_id}
          onChange={(e) => setDepartmentId(Number(e.target.value))}
        >
          {departments.map((dept) => (
            <option key={dept.department_id} value={dept.department_id}>
              {dept.department_name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;