-- Table: public.curseStudent

-- DROP TABLE IF EXISTS public.courseStudent;

-- Create the courseStudent table with foreign keys to courses and students
CREATE TABLE IF NOT EXISTS public.courseStudent (
  course_id INT,
  student_id INT,
  
  -- Optionally add other fields, like enrollment date or grade
  enrollment_date DATE DEFAULT CURRENT_DATE,
  
  -- Define foreign keys
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  
  -- Optionally, define a composite primary key
  PRIMARY KEY (course_id, student_id)
);




