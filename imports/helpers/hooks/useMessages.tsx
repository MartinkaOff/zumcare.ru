import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Message } from '../types/types';
import { Messages } from '../../api/messages/Messages';

export function useMessages(sessionId?: string) {
  const { messages, isMessagesLoading } = useTracker(() => {
    const subscription = sessionId !== undefined ? Meteor.subscribe('messages.chat', sessionId)
      : Meteor.subscribe('messages.allChat');
    const messages = Messages.find().fetch() as Message[];
    return { messages, isMessagesLoading: !subscription.ready() };
  });
  return { messages, isMessagesLoading };

  // const [messages, setMessages] = useState<Message[]>([]);
  // const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  // const subscription = Meteor.subscribe('messages.all', userType);
  // useEffect(() => {
  //   const subscription = Meteor.subscribe('messages.all', userType);

  //   if (subscription.ready()) {
  //     setIsMessagesLoading(true);
  //     const messages = Messages.find(
  //       {},
  //       { sort: { createdAt: -1 } },
  //     ).fetch() as Message[];
  //     setMessages(messages);
  //     setIsMessagesLoading(false);
  //   }

  //   return () => {
  //     subscription.stop();
  //   };
  // }, [userType]);

  // const sendMessage = (content: string, userType: string, userId: string) => {
  //   Meteor.call('messages.send', content, userType, userId, (error) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  // return {
  //   messages,
  //   isMessagesLoading,
  //   // sendMessage
  // };
}
