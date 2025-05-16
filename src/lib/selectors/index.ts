import { createSelector } from "reselect";

import { RootState } from "../../store";

const selectRecommendations = (state: RootState) => state.recommendations;
const selectUser = (state: RootState) => state.user;
const selectConnections = (state: RootState) => state.connections;

export const selectUpcomingEventsRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.upcomingEvents]
);

export const selectLiveEventsRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.liveEvents]
);

export const selectEventsRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.events]
);

export const selectArticleRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.articles]
);

export const selectJobRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.jobs]
);

export const selectIsRecommendationsLoading = createSelector(
  selectRecommendations,
  (recommendations) => !!recommendations.isLoading
);

export const selectRecommendationsHasFetched = createSelector(
  selectRecommendations,
  (recommendations) => !!recommendations.hasFetched
);

export const selectRecommendationsError = createSelector(
  selectRecommendations,
  (recommendations) => recommendations.error
);

export const selectCurrentUser = createSelector(
  selectUser,
  (user) => user.data
);

export const selectCurrentUserProfileUpdateStatus = createSelector(
  selectUser,
  (user) => user?.data?.profile?.requires_update
);

export const selectCurrentUserError = createSelector(
  selectUser,
  (user) => user?.error
);

export const selectConnectionsData = createSelector(
  selectConnections,
  (connections) => Object.assign({}, connections.data)
);
