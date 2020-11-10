import React from 'react';
import './App.css';
import './css/bootstrap.min.css'
import PageButton from './component/PageButton'
import Alert from './component/alert'
import Link from './component/link'
import ContextAwareToggle from './component/according'

function App() {
  return (
    <div className="App">
      <h1>Belajar Bootsrap di React</h1>
      <PageButton />
      <Alert />
      <Link />
      <ContextAwareToggle />
    </div>
  );
}

export default App;
