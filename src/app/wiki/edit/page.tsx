// app/wiki/edit/page.tsx
'use client';

import { useState } from 'react';

const WikiEditPage = () => {
  const [content, setContent] = useState('');

  return (
    <main>
      <h2>위키 편집</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </main>
  );
};

export default WikiEditPage;
