export interface LabelProps {
  label: string;
}

export interface TextAreaMainProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  errorMessage?: string;
  status?: 'default' | 'error';
  maxLength?: number;
}
