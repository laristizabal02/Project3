export interface StudentFormProps {
    onSubmit: (name: string, courseId: number) => Promise<void>;
  }