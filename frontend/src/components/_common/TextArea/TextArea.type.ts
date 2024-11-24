export interface LabelProps {
  children: React.ReactNode;
}

export interface TextAreaMainProps {
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
