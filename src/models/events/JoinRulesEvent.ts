import { StateEvent } from "./RoomEvent";

/**
 * The types of join rules that are valid in Matrix.
 */
export type JoinRule = "public" | "knock" | "invite" | "private";

/**
 * The content definition for m.room.join_rules events
 */
export interface JoinRulesEventContent {
    /**
     * The join rule for the room.
     */
    join_rule: JoinRule;
}

/**
 * Represents an m.room.join_rules state event
 */
export class JoinRulesEvent extends StateEvent<JoinRulesEventContent> {
    constructor(event: any) {
        super(event);
    }

    /**
     * The join rule for the room.
     */
    public get rule(): JoinRule {
        return this.content.join_rule;
    }
}
