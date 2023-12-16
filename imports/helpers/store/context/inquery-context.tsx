import React, {useState, createContext} from 'react';

export const InqueryContext = createContext({
  enrolled: false,
  enroll: () => {},
  data: {},
});

export function InqueryContextProvider({children, inqueryData}) {
  const [enrolled, setEnrolled] = useState(false);

  function enroll() {
    setEnrolled(true);
  }

  const value = {
    enrolled: enrolled,
    enroll: enroll,
    data: inqueryData,
  };

  return (
    <InqueryContext.Provider value={value}>{children}</InqueryContext.Provider>
  );
}
