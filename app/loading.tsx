import { Icon } from '@iconify-icon/react';

const Loading = () => (
  <div
    data-unclamped
    className='fixed inset-0 z-50 place-content-center bg-black/40 text-center text-5xl text-purple-700'
  >
    <Icon icon='svg-spinners:ring-resize' />
  </div>
);

export default Loading;
