import type { AxiosInstance } from "axios";
import type { CreateAssignmentData, GetAssignmentsResponse } from "../types/assignment.type";
import { serverApi } from "./api";

const assignmentApi = serverApi('assignments');

export const createAssignment = (data: CreateAssignmentData) => {
    return assignmentApi.post('/', data);
};

export const editAssignment = (id: string, data: CreateAssignmentData) => {
    return assignmentApi.put(id, data);
}

export const getAssignments = (): Promise<GetAssignmentsResponse> => {
    return assignmentApi.get('/');
}

interface IncomeAssignmentResponse extends AxiosInstance {
    data: {
        availableBalance: string;
        unassignedBox: string;
    }
}

export const incomeAssignment = (data: any): Promise<IncomeAssignmentResponse> => {
    return assignmentApi.patch('/income', data);
}

export const deleteAssignment = (id: string) => {
    return assignmentApi.delete(`/${id}`);
}