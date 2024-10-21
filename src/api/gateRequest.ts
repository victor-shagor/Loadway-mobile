import axios from "./axiosClient";

export enum GateAccessStatus {
  'PENDING' = 'PENDING',
  'CONFIRMED' = 'CONFIRMED',
  'REJECTED' = 'REJECTED',
}

export const getGateRequests = async ( pagination: string = '?page=1&limit=6', status?: string) => {
  const url = status ? `/gate/access-logs?status=${status}` : `/gate/access-logs${pagination}`
    const response = await axios.get(url);
    return response.data.data;
  };
  
  export const getFrequesntVisitors = async () => {
    const response = await axios.get(`/gate/frequent-visitors`);
    return response.data.data;
  };
  
  export const addToFrequentList = async (data: any) => {
    const response = await axios.post(`/gate/frequency/list`, data);
    return response.data.data;
  };
  
  export const createGateAccess = async (data: any) => {
    try {
      const response = await axios.post(`/gate/create-access`, data);
      return response.data.data;
    } catch (error:any) {
      const message = error?.response?.data?.message || 'error creating access'
      throw message
    }
  };
  
  export const revokeGateAccess = async () => {
    const response = await axios.delete(`/gate/access-revoke`);
    return response.data.data;
  };


  