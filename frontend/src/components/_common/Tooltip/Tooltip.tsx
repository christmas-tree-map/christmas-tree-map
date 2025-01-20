import * as S from './Tooltip.css';

const Tooltip = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={S.Layout}>
      {children}
      <div className={S.Arrow} />
    </div>
  );
};

export default Tooltip;
