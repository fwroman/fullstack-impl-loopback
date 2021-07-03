export class User {
    constructor(
        public id?: string,
        public username?: string,
        public gitId?: number,
        public nodeId?: string,
        public avatarUrl?: string,
        public gravatarId?: string,
        public url?: string,
        public htmlUrl?: string,
        public followersUrl?: string,
        public followingUrl?: string,
        public gistsUrl?: string,
        public starredUrl?: string,
        public subscriptionsUrl?: string,
        public organizationsUrl?: string,
        public reposUrl?: string,
        public eventsUrl?: string,
        public receivedEventsUrl?: string,
        public type?: string,
        public siteAdmin?: boolean,
        public createdAt?: string,
        public updatedAt?: string
    ) { }
}