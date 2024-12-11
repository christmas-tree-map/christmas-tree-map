export interface LabelProps {
  label: string;
}

export interface TextAreaMainProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  errorMessage?: string;
  status?: 'default' | 'error';
}
