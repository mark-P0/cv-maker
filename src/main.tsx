import './view/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

class App extends React.Component {
  render() {
    return (
      <div className="bg-gray-500 text-white h-screen w-screen flex items-center justify-center">
        Hello, world!
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
