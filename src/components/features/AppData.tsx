import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { RootState, AppDispatch } from "@/store";
import { fetchCurrentUser } from "@/store/user";
import { fetchRecommendations } from "@/store/recommendations";
import { selectCurrentUser } from "@/lib/selectors";
import { fetchConnections } from "@/store/connections";

const AppDataComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const { currentUser } = useSelector(
    (state: RootState) => ({
      currentUser: selectCurrentUser(state),
    }),
    shallowEqual
  );

  const fetchData = useCallback(async () => {
    if (!initialFetchDone) {
      const fetchPromises = [];

      if (!currentUser?.id) {
        fetchPromises.push(dispatch(fetchCurrentUser()));
      }

      fetchPromises.push(dispatch(fetchRecommendations()));
      fetchPromises.push(dispatch(fetchConnections()));

      await Promise.all(fetchPromises);
      setInitialFetchDone(true);
    }
  }, [initialFetchDone, currentUser?.id, dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  return null;
};

export default AppDataComponent;
