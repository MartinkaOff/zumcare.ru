import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// pages
import { Landing } from '../pages/Landing/Landing';
import { Aboutus } from '../pages/Aboutus/Aboutus';
import { PromoCodes } from '../components/PromoCodes/PromoCodes';
import { FindSpecialist } from '../pages/FindSpecialist/FindSpecialist';
import { Blogs } from '../pages/Blogs/Blogs';
import { BlogContent } from '../pages/BlogContent/BlogContent';
import { FAQ } from '../pages/FAQ/FAQ';
import { Certificates } from '../pages/Certificates/Certificates';
import { BusinessInfo } from '../pages/BusinessInfo/BusinessInfo';
import { Cabinet } from '../pages/Cabinet/Cabinet';
import { Login } from '../pages/Login/Login';
// import { Signup } from '../pages/Signup/Signup.tsx';
import { Extra } from '../pages/Extra/Extra';
import { Schedule } from '../pages/Schedule/Schedule';
import { NotFound } from '../pages/NotFound/NotFound';
import { SpecialistPickerResults } from '../pages/SpecialistPickerResults/SpecialistPickerResults';
import { SpecialistPortfolio } from '../pages/SpecialistPortfolio/SpecialistPortfolio';
import SpecialistPicker from '../pages/SpecialistPicker/SpecialistPicker';
import { SessionsTable } from '../pages/AdminSessionsPage/SessionsTable';
import { ClientsTable } from '../pages/AdminClientsPage/ClientsTable';
import { ClientData } from '../pages/AdminClientsPage/ClientData';
import { SpecialistsTable } from '../pages/AdminSpecialistsPage/SpecialistsTable';
import { SpecialistData } from '../pages/AdminSpecialistsPage/SpecialistData';
import { Sessions } from '../pages/Sessions/Sessions';
import { SignupSettings } from '../components/SignupSettings/SignupSettings';
// import { Statistics } from '../components/ManagerCabinet/Statistics/Statistics';
import { ManagerInfo } from '../components/ManagerCabinet/ManagerInfo';
import { UsersInfo } from '../components/ManagerCabinet/Statistics/UsersInfo';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
// components
import { Navigation } from '../components/Navigation/Navigation.tsx';
import { Chat } from '../components/Chat/Chat';
import { SessionPage } from '../pages/SessionPage/SessionPage';
import { FullCalendarComponent } from '../components/FullCalendar/FullCalendarComponent';
import { Notification } from '../components/Notification/Notification';
import { Company } from '../components/Company/Company';
import { AllClients } from '../pages/AdminClientsPage/AllClients';

// helpers
import { NavbarsContextProvider } from '../../helpers/store/context/navbar-context';
import { InqueryContextProvider } from '../../helpers/store/context/inquery-context';
import { WithSpecialist } from '../../helpers/hocs/withSpecialist';
import { WithAdmin } from '../../helpers/hocs/withAdmin';
import { WithNoAuth } from '../../helpers/hocs/withNoAuth';
import { WithAuth } from '../../helpers/hocs/withAuth';
import { AdminFAQ } from '../pages/AdminFAQ/ListQuestion';
import { Question } from '../pages/AdminFAQ/EditQuestion';
import { Conference } from '../pages/Conference/Conference';
import { AfterConference } from '../pages/Conference/Client/After/AfterConference';
import { AI } from '../pages/AI/AI';
import { useMultipleSessions } from '../../helpers/hooks/useMultipleSessions';
import { useMessages } from '../../helpers/hooks/useMessages';
import { NotificationPush } from '../../helpers/services/notificationPush';
import { notificationToast } from '../../helpers/services/notificationToast';

export default function App() {
  const [inqueryData, setInqueryData] = useState({});
  const user = useTracker(() => Meteor.user());
  const loggingIn = useTracker(() => Meteor.loggingIn());

  const {t} = useTranslation();
  
  let history = useHistory();
  const {messages, isMessagesLoading} = useMessages();
  const {sessions, isSessionLoading} = useMultipleSessions();

  useEffect(() => {
    if (!isSessionLoading && !isMessagesLoading) {
      const newNotificationInterval = setInterval(() => {
        Notification(sessions, user, messages, history, t);
      }, 1000);

      return () => {
        clearInterval(newNotificationInterval);
      };
    }
    }, [sessions, messages]);
 
  const ExtraWithAdmin = WithAdmin(Extra, user, loggingIn);
  const PromoCodesWithAdmin = WithAdmin(PromoCodes, user, loggingIn);

  const ScheduleWithSpecialist = WithSpecialist(Schedule, user, loggingIn);
  const BlogsWithSpecialist = WithSpecialist(Blogs, user, loggingIn);

  const LandingWithNoAuth = WithNoAuth(Landing, user, loggingIn);
  const CertificatesWithNoAuth = WithNoAuth(Certificates, user, loggingIn);
  const BusinessInfoWithNoAuth = WithNoAuth(BusinessInfo, user, loggingIn);
  const SignupWithNoAuth = WithNoAuth(SignupSettings, user, loggingIn);
  const LoginWithNoAuth = WithNoAuth(Login, user, loggingIn);
  const CabinetWithAuth = WithAuth(Cabinet, user, loggingIn);
  const SessionPageWithAuth = WithAuth(SessionPage, user, loggingIn);


  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <NavbarsContextProvider>
        <InqueryContextProvider inqueryData={inqueryData}>
          <div>
            <Navigation {...user} loggingIn={loggingIn} />
            <Switch>
              {/* Common pages */}
              <Route exact path='/specialists' component={FindSpecialist} />
              <Route
                exact
                path='/specialists/picker'
                component={SpecialistPicker}
              />
              <Route exact path='/specialists/picker_results'>
                <SpecialistPickerResults setInqueryData={setInqueryData} />
              </Route>
              <Route
                exact
                path='/specialists/:userId'
                component={SpecialistPortfolio}
              />
              <Route exact path='/ai' component={AI}/>
              <Route exact path='/aboutus' component={Aboutus} />
              <Route exact path='/blog' component={Blogs} />
              <Route exact path='/blog/:id' component={BlogContent} />
              <Route exact path='/faq' component={FAQ} />
              <Route exact path='/not-found' component={NotFound} />
              <Route exact path='/conference/:id' component={Conference} />
              <Route exact path='/question/:id' component={Question} />
              
              {/* Admin pages */}
              <Route exact path='/admin/clients' component={AllClients} />
              <Route
                exact
                path='/admin/clients/:userId'
                component={ClientData}
              />
              <Route exact path='/admin/sessions' component={SessionsTable} />
              <Route exact path='/admin/statistics' component={ManagerInfo} />
              <Route
                exact
                path='/admin/specialists'
                component={SpecialistsTable}
              />
              <Route
                exact
                path='/admin/specialists/:userId'
                component={SpecialistData}
              />
              <Route
                exact
                path='/admin/company'
                component={Company}
              />

              {/* Manager pagaes */}
              <Route exact path='/manager/statistics' component={ManagerInfo} />
              <Route exact path='/manager/usersinfo' component={UsersInfo} />
              <Route
                exact
                path='/manager/specialists/:userId'
                component={SpecialistData}
              />

              {/* Specialist pages */}
              <Route
                exact
                path='/specialist/blog'
                component={BlogsWithSpecialist}
              />
              <Route
                exact
                path='/specialist/schedule'
                component={ScheduleWithSpecialist}
              />
              <Route exact path='/sessions' component={Sessions} />
              <Route
                exact
                path='/specialist/fullcalendar'
                component={FullCalendarComponent}
              />
              {/* Client pages */}
              <Route
                exact
                path='/client/specialists'
                component={FindSpecialist}
              />
              <Route exact path='/chat' component={Chat} />
              <Route
                exact
                path='/session/:_id'
                component={SessionPageWithAuth}
              />
              <Route
                exact
                path='/client/specialists/picker'
                component={SpecialistPicker}
              />
              <Route exact path='/client/specialists/picker_results'>
                <SpecialistPickerResults setInqueryData={setInqueryData} />
              </Route>
              <Route
                exact
                path='/client/specialists/:userId'
                component={SpecialistPortfolio}
              />
              <Route exact path='/sessions' component={Sessions} />
              <Route exact path='/sessions' component={Sessions} />

              {/* Manager pages */}
              <Route exact path='/manager/statistics' component={ManagerInfo} />
              <Route exact path='/manager/usersinfo' component={UsersInfo} />

              {/* Non-authenticated pages */}
              <Route exact path='/' component={LandingWithNoAuth} />
              <Route
                exact
                path='/certificates'
                component={CertificatesWithNoAuth}
              />
              <Route
                exact
                path='/business'
                component={BusinessInfoWithNoAuth}
              />
              <Route exact path='/signup' component={SignupWithNoAuth} />
              <Route exact path='/login' component={LoginWithNoAuth} />
              <Route exact path='/reset-password' component={ForgotPassword}/>

              {/* Authenticated pages */}
              <Route exact path='/cabinet' component={CabinetWithAuth} />

              {/* Admin pages */}
              <Route exact path='/admin/extra' component={ExtraWithAdmin} />

              <Route exact path='/admin/faqs' component={AdminFAQ} />
              <Route
                exact
                path='/admin/promocodes'
                component={PromoCodesWithAdmin}
              />

              {/* Specialist pages */}
              <Route
                exact
                path='/specialist/blog'
                component={BlogsWithSpecialist}
              />
              <Route
                exact
                path='/specialist/schedule'
                component={ScheduleWithSpecialist}
              />
            </Switch>
          </div>
        </InqueryContextProvider>
      </NavbarsContextProvider>
    </Router>
  );
}
