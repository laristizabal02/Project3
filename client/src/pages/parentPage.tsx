import React, { useState, useEffect } from "react";
import { Student } from "../interfaces/Student";
import StudentForm from "../components/StudentForm";
import { useNavigate } from "react-router-dom";
import "./pages.css";

const ParentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [action, setAction] = useState<"add" | "register" | "view" | "school" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/students");
        if (!response.ok) {
          throw new Error("Error fetching students");
        }
        const studentsData = await response.json();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  const handleAddStudent = async (name: string, grade_name: string) => {
    try {
      const response = await fetch("/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, grade_name }),
      });
      if (response.ok) {
        const newStudent = await response.json();
        setStudents([...students, newStudent]);
        setAction(null); // Reset action
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");
    if (isConfirmed) {
      try {
        const response = await fetch(`/students/${id}`, { method: "DELETE" });
  
        if (response.ok) {
          const updatedStudents = await response.json(); // Assuming the server returns all students
          setStudents(updatedStudents); // Update the state with the new list of students
        } else {
          const errorData = await response.json();
          console.error("Error deleting student:", errorData.error);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleUpdateStudent = async (id: number, updatedName: string, updatedGradeName: string) => {
  
    if (!updatedName || !updatedGradeName.trim()) {
      alert("Both name and grade are required.");
      return;
    }
  
    try {
      const response = await fetch(`/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName, grade_name: updatedGradeName }),
      });
  
      if (response.ok) {
        const updatedStudents = await response.json(); // Assuming the server returns all students
        setStudents(updatedStudents); // Update the state with the new list of students
        setAction(null); // Reset the action after updating
      } else {
        const errorData = await response.json();
        console.error("Error updating student:", errorData.error);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <h1>Parent Page</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div>
        <button onClick={() => setAction("add")}>Add Student</button>
    
        <button onClick={() => setAction("school")}>Check School</button>
      </div>

      {action === "add" && <StudentForm onSubmit={handleAddStudent} />}
      {action === "school" && (
        <iframe
          src="https://storage.googleapis.com/maps-solutions-v0osfmsiix/neighborhood-discovery/halo/neighborhood-discovery.html"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.name}</td>
                <td>{student.grade_name}</td>
                <td>
                  <button
                    onClick={() => {
                      const newName = prompt("Enter new name:", student.name);
                      const newGrade = prompt("Enter new name:", student.grade_name);
                      if (newName && newGrade) {
                        handleUpdateStudent(student.student_id, newName, newGrade);
                      }
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.student_id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No students found.</td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default ParentPage;