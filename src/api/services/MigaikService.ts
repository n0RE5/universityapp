import axios, { AxiosResponse } from "axios";
import { $migaikApi, API_URL } from "..";
import { IGetMe, IGetScheduleResponse, IUniversityGroup } from "../../types/migaik";

export default class MigaikService {
    static async getSchedule(groupId: number | string, date: Date): Promise<AxiosResponse<IGetScheduleResponse>> {
        return $migaikApi.get<IGetScheduleResponse>(`/groups/get/schedule/${groupId}?date=${date.toISOString()}`)
    }
    static async getGroups(): Promise<AxiosResponse<IUniversityGroup[]>> {
        return $migaikApi.get<IUniversityGroup[]>(`/groups/get`)
    }
    static async getGroup(groupId: string): Promise<AxiosResponse<IUniversityGroup>> {
        return $migaikApi.get<IUniversityGroup>(`/groups/get/${groupId}`)
    }
    static async contactHeadman(message: string): Promise<AxiosResponse> {
        return $migaikApi.post(`/groups/contact_headman`, {
            message
        })
    }
    static async joinGroup(group_id: string): Promise<AxiosResponse> {
        return $migaikApi.post(`/applications/join/${group_id}`)
    }
    static async init(initData: string): Promise<AxiosResponse<{token: string}>> {
        return axios.post<{token: string}>(`${API_URL}/auth/init`, {
            initData
        })
    }
    static async getMe(): Promise<AxiosResponse<IGetMe>> {
        return $migaikApi.get<IGetMe>(`/users/get/me`)
    }
}