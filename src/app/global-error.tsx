'use client'

import React from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {

  return (
    <div>
      <h2>{error.message || 'Something went wrong!'}</h2>
      <button onClick={reset || (() => location.reload())}>Try again</button>
    </div>
  );
}


  