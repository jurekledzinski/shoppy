export interface FieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  classNameField?: string;
  classNameLabel?: string;
  classNameInput?: string;
  name?: string;
  label?: string;
  type:
    | 'checkbox'
    | 'date'
    | 'email'
    | 'number'
    | 'text'
    | 'password'
    | 'radio';
  placeholder?: string;
}
