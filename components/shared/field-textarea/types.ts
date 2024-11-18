export interface FieldTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  classNameField?: string;
  classNameLabel?: string;
  classNameTextarea?: string;
  name?: string;
  label?: string;
  placeholder?: string;
}
