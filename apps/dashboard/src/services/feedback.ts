import { IBaseResponse, IFeedbackRequest } from "@/types";

import { defaultRequest } from "@/lib/axios";

const sendFeedback = (request: IFeedbackRequest) =>
  defaultRequest
    .post<IBaseResponse<number>>("/feedback", request)
    .then(({ data }) => data);

export const feedbackServices = {
  sendFeedback,
};
