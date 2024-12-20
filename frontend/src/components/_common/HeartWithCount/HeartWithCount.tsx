import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { IoIosHeartEmpty } from '@react-icons/all-files/io/IoIosHeartEmpty';
import { vars } from '@/styles/theme.css';
import * as S from './HeartWithCount.css';

interface HeartWithCountProps {
  count?: number;
  isSelected: boolean;
  onClickIcon: () => void;
}

const HeartWithCount = ({ count, isSelected, onClickIcon }: HeartWithCountProps) => {
  const HeartIcon = isSelected ? IoIosHeart : IoIosHeartEmpty;

  return (
    <div className={S.Layout}>
      {count && <p className={S.CountText}>{count}</p>}
      <HeartIcon color={isSelected ? vars.colors.primary[800] : vars.colors.black} size={20} onClick={onClickIcon} />
    </div>
  );
};

export default HeartWithCount;
