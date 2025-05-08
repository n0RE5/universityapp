import axios, { AxiosResponse } from "axios";
import { $migaikApi, API_URL } from "..";
import { IGetMe, IGetScheduleResponse, IUniversityGroup } from "../../types/migaik";

export default class MigaikService {
    static async getSchedule(groupId: string, date: Date): Promise<AxiosResponse<IGetScheduleResponse>> {
        return $migaikApi.get<IGetScheduleResponse>(`/api/v1/groups/${groupId}/schedule`, {
            params: {
                date: date.toISOString()
            }
        })
    }
    static async getGroups(): Promise<AxiosResponse<IUniversityGroup[]>> {
        return $migaikApi.get<IUniversityGroup[]>(`/api/v1/groups`)
    }
    static async getGroup(groupId: string): Promise<AxiosResponse<IUniversityGroup>> {
        return $migaikApi.get<IUniversityGroup>(`/api/v1/groups/${groupId}`)
    }
    static async contactHeadman(message: string): Promise<AxiosResponse> {
        return $migaikApi.post(`/api/v1/groups/contact_headman`, {
            message
        })
    }
    static async joinGroup(groupId: string): Promise<AxiosResponse> {
        return $migaikApi.post(`/api/v1/applications`, {
            group_id: groupId
        })
    }
    static async init(initData: string): Promise<AxiosResponse<{access_token: string}>> {
        return axios.post<{access_token: string}>(`${API_URL}/api/v1/auth/init`, {
            init_data: initData
        })
    }
    static async getMe(): Promise<AxiosResponse<IGetMe>> {
        return $migaikApi.get<IGetMe>(`/api/v1/users/me`)
    }
}