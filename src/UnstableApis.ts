import { MatrixClient } from "./MatrixClient";

/**
 * Represents a profile for a group
 */
export interface GroupProfile {
    /**
     * The name of the group
     */
    name: string;

    /**
     * The avatar for the group. Must be a MSC URI.
     */
    avatar_url: string;

    /**
     * The short description for the group. Equivalent to a room's topic.
     */
    short_description: string;

    /**
     * The long description for the group. Most clients will support HTML
     * in this.
     */
    long_description: string;
}

/**
 * Unstable APIs that shouldn't be used in most circumstances.
 */
export class UnstableApis {
    constructor(private client: MatrixClient) {
    }

    /**
     * Creates a group.
     * @param {string} localpart The localpart for the group
     * @return {Promise<string>} Resolves to the created group ID.
     */
    public async createGroup(localpart: string): Promise<string> {
        const response = await this.client.doRequest("POST", "/_matrix/client/r0/create_group", null, {"localpart": localpart});
        return response["group_id"];
    }

    /**
     * Invites a user to the group.
     * @param {string} groupId The group ID to invite the user to.
     * @param {string} userId The user ID to invite to the group.
     * @return {Promise<"join" | "invite" | "reject">} Resolves to the invite state for
     *  the user. This is normally "invite", but may be "join" or "reject" if the user's
     *  homeserver accepted/rejected the invite right away.
     */
    public async inviteUserToGroup(groupId: string, userId: string): Promise<"join" | "invite" | "reject"> {
        const response = await this.client.doRequest("PUT", `/_matrix/client/r0/groups/${groupId}/admin/users/invite/${userId}`, null, {});
        return response["state"];
    }

    /**
     * Updates a group's profile
     * @param {string} groupId The group ID to update.
     * @param {GroupProfile} profile The profile to update the group with.
     * @return {Promise<*>} Resolves when completed.
     */
    public async setGroupProfile(groupId: string, profile: GroupProfile): Promise<any> {
        return this.client.doRequest("POST", `/_matrix/client/r0/groups/${groupId}/profile`, null, profile);
    }

    /**
     * Sets a group's join policy to either be publicly joinable (open) or
     * require an invite (invite).
     * @param {string} groupId The group ID to set the policy for.
     * @param {"open" | "invite"} policy The policy to set.
     * @return {Promise<*>} Resolves when completed.
     */
    public async setGroupJoinPolicy(groupId: string, policy: "open" | "invite"): Promise<any> {
        return this.client.doRequest("PUT", `/_matrix/client/r0/groups/${groupId}/settings/m.join_policy`, null, {
            "m.join_policy": {
                "type": policy,
            },
        });
    }
}
