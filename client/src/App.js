import React, {useState} from 'react';
import './scss/index.scss'

import Form from './components/Form';
import CommentsContainer from './components/CommentsContainer';

function App() {
const [ users, serUsers ] = useState([]);

  return (
    <main>
      <Form></Form>
      <CommentsContainer></CommentsContainer>
    </main>
  );
}

export default App;
