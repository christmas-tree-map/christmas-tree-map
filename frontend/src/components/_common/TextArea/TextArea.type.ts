export interface LabelProps {
  children: string;
}

export interface TextAreaMainProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
