"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ActivityTypes } = require('botbuilder');
// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';
class MyBot {
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
    onTurn(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
            if (turnContext.activity.type === ActivityTypes.Message) {
                // read from state.
                let count = yield this.countProperty.get(turnContext);
                count = count === undefined ? 1 : ++count;
                const myTextReturn = this.iA(turnContext.activity.text);
                yield turnContext.sendActivity(myTextReturn);
                // increment and set turn counter.
                yield this.countProperty.set(turnContext, count);
            }
            else {
                yield turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
            }
            // Save state changes
            yield this.conversationState.saveChanges(turnContext);
        });
    }
    iA(userText) {
        try {
            if (isNaN(userText)) {
                return `: You sai: ${userText}-> string`;
            }
            return `: You sai: ${userText}-> number`;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.MyBot = MyBot;
//# sourceMappingURL=bot.js.map