# NodeJS Recruitment Task

The events module is similar to the system calendar, but it doesn't allow storing duplications.

Your goal is to implement:
1. Mock service of that module in the following file:<br/>`src/events/services/impl/events-mock.service.ts`.
2. Unit tests for the mocked service in the following file:<br/>`src/events/services/impl/events-mock.service.spec.ts`.

The task shouldn't take you more than one day.
Remember about general coding best practices, including code formatting, commit conventions, etc.

### Acceptance criteria

**Business**:

1. user should be able to create events at any time;
2. user should be able to create a new event with the same start time as the previous one's end time;
3. user shouldn't be able to create events with conflicted time (excluding case 2.);
4. user should be able to remove any past/current/future event;
5. user should be able to get any past/current/future event by the identifier;
6. user should be able to get any past/current/future event in a period.

**Technical**:

1. service should throw an exception when a user tries to get a non-existing event
2. exceptions should be named corresponding to the business value
3. exceptions should inherit Error type
4. all methods accept only valid ISO 8601 dates as a string


### Code structure
It is up to you how do you organize code structure. Be prepared for an explanation of why did you choose that one.

Events service contains four methods:

- `createEvent` - for creating a new event;
- `getEvent` - for getting event by the identifier;
- `getEvents` - for getting events in time period (including pagination);
- `removeEvent` – for removing events by the identifier.

### Areas

This challenge checks your knowledge in the following areas:

- Understanding general technical problems related to processing dates and times;
- Understanding TypeScript, including Dates, array operations, syntax;
- Understanding JavaScript, including Dates, array operations, syntax;
- Understanding Git and general commits conventions;
- Writing Unit Tests.

