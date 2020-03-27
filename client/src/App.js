import React, { useState } from 'react';
import './scss/index.scss'

import Form from './components/Form';
import CommentsContainer from './components/CommentsContainer';

function App() {
    const [isCollectionChange, setCollectionChange] = useState(false);

    function handleCollectionChange() {
        setCollectionChange(true);
        setCollectionChange(false);
    }

  return (
    <main>
      <Form onCollectionChange={handleCollectionChange}/>
      <CommentsContainer isCollectionChange={isCollectionChange}/>
    </main>
  );
}

export default App;
