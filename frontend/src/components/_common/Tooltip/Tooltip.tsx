import * as S from './Tooltip.css';
import { TooltipMenus } from './Tooltip.type';

interface TooltipProps {
  menus: TooltipMenus[];
}

const Tooltip = ({ menus }: TooltipProps) => {
  return (
    <div className={S.Layout}>
      {menus.map((menu, index) => (
        <button onClick={menu.onClick} key={index}>
          <p className={S.menuText}>{menu.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Tooltip;
