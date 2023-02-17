import './view/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Preview } from './view/components/Preview.js';
import { TopBar } from './view/components/TopBar.js';
import { InputFields } from './view/components/InputFields.js';

class App extends React.Component {
  render() {
    return (
      <div className="h-screen grid grid-cols-[5fr_3fr]">
        <div className="h-full overflow-hidden bg-neutral-500 flex flex-col [&>*:nth-child(2)]:flex-1">
          <TopBar />
          <InputFields />
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
