import { AppDispatch } from "store";
import {
  Application,
  applicationSlice,
  CreateApplicationRequest,
} from "./ApplicationSlice";
import { API_URL } from "config";
import { api, auth } from "store/api";
import axios from "axios";

export const editApplication =
  (application: CreateApplicationRequest) => async (dispatch: AppDispatch) => {
    dispatch(applicationSlice.actions.editApplication(application));
  };

export const createApplication =
  (
    data: CreateApplicationRequest,
    callback: () => void,
    errorCallback?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(applicationSlice.actions.createApplicationFetching());
      const response = await axios.post(
        `${API_URL}${api.application.createApplication}`,
        data,
        auth()
      );
      dispatch(
        applicationSlice.actions.createApplicationSuccess(response.data)
      );
      // dispatch(fetchOffers());
      callback();
    } catch (e: any) {
      errorCallback && errorCallback();
      dispatch(
        applicationSlice.actions.createApplicationError(e.response.data.message)
      );
    }
  };

export const getMyApplications =
  (callback?: () => void, errorCallback?: () => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(applicationSlice.actions.getMyApplicationsFetching());
      const response = await axios.get(
        `${API_URL}${api.application.getMyApplications}`,
        auth()
      );
      dispatch(
        applicationSlice.actions.getMyApplicationsSuccess(response.data)
      );
      // dispatch(fetchOffers());
      callback && callback();
    } catch (e: any) {
      errorCallback && errorCallback();
      dispatch(
        applicationSlice.actions.getMyApplicationsError(e.response.data.message)
      );
    }
  };

export const completeApplication =
  (
    data: { applicationId: string; rating: number },
    callback?: () => void,
    errorCallback?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        applicationSlice.actions.completeApplicationFetching(data.applicationId)
      );
      await axios.post(
        `${API_URL}${api.application.completeApplication}`,
        data,
        auth()
      );
      dispatch(applicationSlice.actions.completeApplicationSuccess());
      // dispatch(fetchOffers());
      callback && callback();
    } catch (e: any) {
      errorCallback && errorCallback();
      dispatch(
        applicationSlice.actions.completeApplicationError(
          e.response.data.message
        )
      );
    }
  };

export const acceptApplication =
  (
    data: { applicationId: string },
    callback?: () => void,
    errorCallback?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        applicationSlice.actions.completeApplicationFetching(data.applicationId)
      );
      await axios.post(
        `${API_URL}${api.application.acceptApplication}`,
        data,
        auth()
      );
      dispatch(applicationSlice.actions.completeApplicationSuccess());
      callback && callback();
    } catch (e: any) {
      errorCallback && errorCallback();
      dispatch(
        applicationSlice.actions.completeApplicationError(
          e.response.data.message
        )
      );
    }
  };

export const deliteApplication =
  (
    data: { applicationId: string },
    callback?: () => void,
    errorCallback?: () => void
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        applicationSlice.actions.deliteApplicationFetching(data.applicationId)
      );
      await axios.post(
        `${API_URL}${api.application.deliteApplication}`,
        data,
        auth()
      );
      dispatch(
        applicationSlice.actions.deliteApplicationSuccess(data.applicationId)
      );
      callback && callback();
    } catch (e: any) {
      errorCallback && errorCallback();
      dispatch(
        applicationSlice.actions.deliteApplicationError(e.response.data.message)
      );
    }
  };

export const addNewApplicationEvent =
  (application: Application) => async (dispatch: AppDispatch) => {
    dispatch(applicationSlice.actions.addNewApplication(application));
  };
export const updateApplicationStatusEvent =
  (application: Application) => async (dispatch: AppDispatch) => {
    dispatch(applicationSlice.actions.updateApplicationStatus(application));
  };
export const deliteApplicationEvent =
  (applicationId: string) => async (dispatch: AppDispatch) => {
    dispatch(applicationSlice.actions.deliteApplicationSuccess(applicationId));
  };
