import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>에러 발생!</h1>
      <p>{(error as Error).message}</p>
    </div>
  );
};

export default Error;
