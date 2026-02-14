import type { AxiosInstance } from "axios";

export interface CreateAssignmentData {
    name: string;
    assignedAmount: string;
    type: string;
}

export interface AssignmentData {
    assignedAmount: string;
    availableBalance: string;
    id: string;
    name: string;
    type: string;
    userId?: string;
}

export interface GetAssignmentsData {
    assignments: {
        'Gasto Fijo'?: AssignmentData[];
        'Gasto Variable'?: AssignmentData[];
        'Ahorro'?: AssignmentData[];
        'Gasto Extra'?: AssignmentData[]; 
    };
    unassignedBalance: string;
}

export interface GetAssignmentsResponse extends AxiosInstance {
    data: AssignmentData[];
}