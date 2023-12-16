import { check } from "meteor/check";
import { PickerQuestion } from "../../../helpers/types";
import { PickerQuestions } from "../PickerQuestions";

Meteor.methods({
  "pickerQuestions.insert"(question: PickerQuestion) {
    check(question, {
      name: String,
      content: String,
      type: String,
      options: [String],
    });

    PickerQuestions.insert(question);
  },

  "pickerQuestions.update"(
    _id: string,
    name: string,
    content: string,
    type: string,
    options: string[]
  ) {
    check(_id, String);
    check(name, String);
    check(content, String);
    check(type, String);
    check(options, [String]);

    PickerQuestions.update(
      { _id: _id },
      { $set: { name, content, type, options } }
    );
  },

  "pickerQuestions.remove"(_id: string) {
    check(_id, String);

    PickerQuestions.remove(_id);
  },
});
