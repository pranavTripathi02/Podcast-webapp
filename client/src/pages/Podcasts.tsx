import React from 'react';
import useRefreshToken from '../hooks/useRefreshToken';

export default function Podcasts() {
  const refresh = useRefreshToken();
  return (
    <div>
      <button onClick={() => refresh()}>refresh</button>
    </div>
  );
}
