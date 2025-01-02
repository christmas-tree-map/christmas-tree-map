import * as S from './CourseItem.css';

interface CourseItemProps {
  title: string;
  address: string;
  phone: string;
}

const CourseItem = ({ title, address, phone }: CourseItemProps) => {
  return (
    <div className={S.Layout}>
      <p className={S.Title}>{title}</p>
      <div className={S.InfoContainer}>
        <p>{address}</p>
        <p className={S.PhoneText}>{phone}</p>
      </div>
    </div>
  );
};

export default CourseItem;
