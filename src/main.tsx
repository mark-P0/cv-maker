import './view/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Preview } from './view/components/Preview.js';
import { TopBar } from './view/components/TopBar.js';
import { InputFields } from './view/components/InputFields.js';

class App extends React.Component {
  render() {
    return (
      <div className="h-screen w-screen grid grid-cols-[3fr_2fr]">
        <div className="max-h-full overflow-hidden flex flex-col [&>*:nth-child(2)]:flex-1">
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
