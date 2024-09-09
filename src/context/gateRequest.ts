import { createContext, useContext } from "react";

export type RequestContextType = {
  refetch: boolean;
  setRefetch: (value: boolean) => void;
  frequents: any[];
  setFrequent: (value: string) => void;
};

const RequestContext = createContext<RequestContextType | null>(null);

export default RequestContext;

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("request must be used within an requestProvider");
  }
  return context;
};

export const useRequestContext = () => {
  const context = useRequest()!;
  if (!context) {
    throw new Error("An error occurred");
  }

  return context;
};