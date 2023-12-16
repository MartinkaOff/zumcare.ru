import { useTracker } from "meteor/react-meteor-data";
import { PickerQuestion } from "../types/types";
import { PickerQuestions } from "../../api/pickerQuestions/PickerQuestions";

export function usePickerQuestions() {
  const { questions, isPickerQuestionsLoading } = useTracker(() => {
    const subscription = Meteor.subscribe("pickerQuestions.all");
    const questions = PickerQuestions.find().fetch() as PickerQuestion[];

    return { questions, isPickerQuestionsLoading: !subscription.ready() };
  });

  const updatePickerQuestions = (
    _id: string,
    name: string,
    content: string,
    type: string,
    options: string[]
  ) => {
    Meteor.call("pickerQuestions.update", _id, name, content, type, options);
  };

  return { questions, isPickerQuestionsLoading, updatePickerQuestions };
}
