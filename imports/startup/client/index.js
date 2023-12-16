import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '/imports/ui/layouts/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import '../../ui/index.css';
import { Loading } from '../../ui/components/Loading/Loading';

Meteor.startup(() => {
  // ReactDOM.render(
  //   <Suspense fallback={<Loading />}>
  //     <Router>
  //       <App />
  //     </Router>
  //   </Suspense>,
  //   document.getElementById('react-target'),
  // );
  window.addEventListener('load', () => {
    const root = createRoot(document.getElementById('root'));
    root.render(
      <Suspense fallback={<Loading />}>
          <Router>
            <App />
          </Router>
        </Suspense>
    );
  });
});
