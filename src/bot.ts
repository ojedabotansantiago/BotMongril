// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

//my imports
import { MyCalculator } from './myCalculator';
const myCalculator = MyCalculator;
export class MyBot {
  public countProperty;
  public conversationState;
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
    this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    this.conversationState = conversationState;
  }
  /**
   *
   * @param {TurnContext} on turn context object.
   */
  async onTurn(turnContext) {
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    if (turnContext.activity.type === ActivityTypes.Message) {
      // read from state.
      let count = await this.countProperty.get(turnContext);
      count = count === undefined ? 1 : ++count;
      const myTextReturn = this.iA(turnContext.activity.text);
      await turnContext.sendActivity(myTextReturn);
      // increment and set turn counter.
      await this.countProperty.set(turnContext, count);
    } else {
      await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }
    // Save state changes
    await this.conversationState.saveChanges(turnContext);
  }

  private iA(userText) {
    try {
      if (isNaN(userText)) {
        return `: You sai: ${userText}-> string`;
      }
      return `: You sai: ${userText}-> number`;
    } catch (error) {
      console.log(error);
    }
  }
}
