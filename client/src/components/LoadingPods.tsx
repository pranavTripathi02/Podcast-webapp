import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingPods() {
  return (
    <div className='my-20 text-center'>
      <FontAwesomeIcon className='text-7xl animate-spin' icon={faCircleNotch} />
    </div>
  );
}
