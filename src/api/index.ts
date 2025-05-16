import axios from "axios";

import axiosInstance from "@/lib/axiosInstance";
import {
  Event,
  Activity,
  Project,
  Profile,
  Article,
  Job,
  EventWithPagination,
  ArticlesWithPagination,
  ProjectsWithPagination,
  ProfilesWithPagination,
  IPagination,
  Comment,
  IFilters,
} from "@/common/constants";

export const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get("/api/proxy/activities");

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchEventsData = async (
  pagination: any,
  contentType: string
): Promise<EventWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/events", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchProjectsData = async (
  pagination: any,
  contentType: string
): Promise<ProjectsWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/projects", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchArticlesData = async (
  pagination: any,
  contentType: string
): Promise<ArticlesWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/articles", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchEvent = async (id: string): Promise<Event> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/events/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  const response = await axiosInstance.delete(`/api/proxy/events/${eventId}`);

  return response.data.data;
};

export const fetchProject = async (id: string): Promise<Project> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/projects/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  const response = await axiosInstance.delete(
    `/api/proxy/projects/${projectId}`
  );

  return response.data.data;
};

export const deleteProjectFeedback = async (
  projectId: string,
  feedbackId: string
) => {
  const response = await axiosInstance.delete(
    `/api/proxy/projects/${projectId}/${feedbackId}/feedbacks`
  );

  return response.data.data;
};

export const fetchProjects = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ProjectsWithPagination> => {
  try {
    const { skills, ...rest } = filters;
    const response = await axiosInstance.get("/api/proxy/projects", {
      params: {
        contentType: "all",
        ...pagination,
        ...rest,
        ...(skills && { skills: [skills] }),
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchArticles = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ArticlesWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/articles", {
      params: {
        contentType: "all",
        ...pagination,
        ...filters,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchPublicArticles = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ArticlesWithPagination> => {
  try {
    const response = await axios.get("/api/proxy/articles/public", {
      params: {
        ...pagination,
        ...filters,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchArticle = async (id: string): Promise<Article> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/articles/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchPublicArticle = async (id: string): Promise<Article> => {
  try {
    const response = await axios.get(`/api/proxy/articles/${id}/public`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteArticle = async (articleId: string) => {
  const response = await axiosInstance.delete(
    `/api/proxy/articles/${articleId}`
  );

  return response.data.data;
};

export const fetchJob = async (id: string): Promise<Job> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/jobs/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteJob = async (jobId: string) => {
  const response = await axiosInstance.delete(`/api/proxy/jobs/${jobId}`);

  return response.data.data;
};

export const fetchProfile = async (id: string): Promise<Profile> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/profiles/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchProfiles = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ProfilesWithPagination> => {
  try {
    const { skills, type, ...rest } = filters;
    const response = await axiosInstance.get("/api/proxy/profiles", {
      params: {
        ...pagination,
        ...rest,
        ...(skills && { skills: [skills] }),
        ...(type && { is_mentor: true }),
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const followUser = async (profileId: string) => {
  const response = await axiosInstance.patch(
    `/api/proxy/profiles/${profileId}/follow`
  );

  return response.data.data;
};

export const unfollowUser = async (profileId: string) => {
  const response = await axiosInstance.patch(
    `/api/proxy/profiles/${profileId}/unfollow`
  );

  return response.data.data;
};

export const createComment = async (
  resource: string,
  resourceId: string,
  data: Partial<Comment>
) => {
  const response = await axiosInstance.post(
    `/api/proxy/${resource}/${resourceId}/comments`,
    data
  );

  return response.data.data;
};

export const createReaction = async (resource: string, resourceId: string) => {
  const response = await axiosInstance.post(
    `/api/proxy/${resource}/${resourceId}/reactions`,
    {
      type: "like",
    }
  );

  return response.data.data;
};

export const deleteComment = async (
  resource: string,
  resourceId: string,
  commentId: string
) => {
  const response = await axiosInstance.delete(
    `/api/proxy/${resource}/${resourceId}/${commentId}/comments`
  );

  return response.data.data;
};

export const createEvent = async (data: Partial<Event>) => {
  const result = await axiosInstance.post("/api/proxy/events", data);

  return result?.data?.data;
};

export const updateEvent = async (data: Partial<Event>, id: string) => {
  const result = await axiosInstance.put(`/api/proxy/events/${id}`, data);

  return result?.data?.data;
};

export const createArticle = async (data: Partial<Article>) => {
  const result = await axiosInstance.post("/api/proxy/articles", data);

  return result?.data?.data;
};

export const updateArticle = async (data: Partial<Article>, id: string) => {
  const result = await axiosInstance.put(`/api/proxy/articles/${id}`, data);

  return result?.data?.data;
};

export const createJob = async (data: Partial<Job>) => {
  const result = await axiosInstance.post("/api/proxy/jobs", data);

  return result?.data?.data;
};

export const updateJob = async (data: Partial<Job>, id: string) => {
  const result = await axiosInstance.put(`/api/proxy/jobs/${id}`, data);

  return result?.data?.data;
};

export const fetchArticleRecommendations = async () => {
  const result = await axios.get("/api/proxy/recommendations?type=article");

  return result?.data?.data;
};
