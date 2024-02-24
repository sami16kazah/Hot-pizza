import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  return (
    <div>
      {error.status} , {error.data || error.message}
      <LinkButton to="-1"> &larr; Go back </LinkButton>
    </div>
  );
}

export default Error;
