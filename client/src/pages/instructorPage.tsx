import React, { useState, useEffect } from "react";
import { Course } from "../interfaces/CourseInt";
import { Department } from "../interfaces/DepartmentInt";
import CourseForm from "../components/CourseForm";
import { useNavigate } from "react-router-dom";
import "./pages.css";

const InstructorPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [action, setAction] = useState<"add" | "delete" | "update" | null>(null);
  const navigate = useNavigate();

  const departmentMap: { [key: number]: string } = {
    1: "Math",
    2: "Science",
    3: "Arts",
  };

  useEffect(() => {
    const fetchCoursesAndDepartments = async () => {
      try {
        const coursesResponse = await fetch(`/courses`);
        if (!coursesResponse.ok) {
          throw new Error(`Error fetching courses: ${coursesResponse.statusText}`);
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        const departmentsResponse = await fetch(`/departments`);
        if (!departmentsResponse.ok) {
          throw new Error(`Error fetching departments: ${departmentsResponse.statusText}`);
        }
        const departmentsData = await departmentsResponse.json();
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching courses or departments:", error);
      }
    };
    fetchCoursesAndDepartments();
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to Logout?");
    if (isConfirmed) {
    localStorage.removeItem("authToken");
    navigate("/login");
    }
  };

  const handleAddCourse = async (title: string, department_id: number) => {
    console.log(title, department_id);
    try {
      const response = await fetch("/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, department_id }),
      });
      if (response.ok) {
        const newCourses = await response.json();
        setCourses(newCourses);
        setAction(null); // Reset action after adding
        window.confirm("It was added succesfully");
        const fetchCoursesAndDepartments = async () => {
          try {
            const coursesResponse = await fetch(`/courses`);
            if (!coursesResponse.ok) {
              throw new Error(`Error fetching courses: ${coursesResponse.statusText}`);
            }
            const coursesData = await coursesResponse.json();
            setCourses(coursesData);
    
            const departmentsResponse = await fetch(`/departments`);
            if (!departmentsResponse.ok) {
              throw new Error(`Error fetching departments: ${departmentsResponse.statusText}`);
            }
            const departmentsData = await departmentsResponse.json();
            setDepartments(departmentsData);
          } catch (error) {
            console.error("Error fetching courses or departments:", error);
          }
        };
        fetchCoursesAndDepartments();
      } else {
        const errorData = await response.json();
        console.error("Error adding course:", errorData.error);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleUpdateCourse = async (id: number, updatedTitle: string) => {
    try {
      const response = await fetch(`/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatedTitle }),
      });
      if (response.ok) {
        const updatedCourses = await response.json(); 
        setCourses(updatedCourses);
        setAction(null); // Reset action after updating
      } else {
        const errorData = await response.json();
        console.error("Error updating course:", errorData.error);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      try {
        const response = await fetch(`/courses/${id}`, { method: "DELETE" });
        if (response.ok) {
          const newCourses = await response.json(); // Assuming server returns all courses
          setCourses(newCourses);
        } else {
          const errorData = await response.json();
          console.error("Error deleting course:", errorData.error);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div>
      <h1>Instructor Page</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div>
        <button onClick={() => setAction("add")}>Add New Course</button>
      </div>

      {action === "add" && (
        <CourseForm
          departments={departments}
          onSubmit={handleAddCourse} // Pass the function that expects (title, department_id) as arguments
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.title}</td>
                <td>{departmentMap[course.department_id]}</td>
                <td>
                  <button
                    onClick={() => {
                      const newTitle = prompt("Enter new title:", course.title);
                      if (newTitle) {
                        handleUpdateCourse(course.course_id, newTitle);
                      }
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDeleteCourse(course.course_id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No courses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorPage;