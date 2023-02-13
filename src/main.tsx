import './view/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Preview } from './view/components/Preview.js';

class App extends React.Component {
  render() {
    return (
      <div className="h-screen w-screen grid grid-cols-3">
        <div className="col-span-2 bg-gray-500">
          <code>input-fields</code>
        </div>
        <Preview />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
