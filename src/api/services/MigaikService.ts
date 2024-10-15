import { AxiosResponse } from "axios";
import { $migaikApi } from "..";
import { IGetScheduleResponse, IUniversityGroup } from "../../types/migaik";
import getWeekNumber from "../../utils/getWeekNumber";

export default class MigaikService {
    static async getSchedule(groupId: number | string, date: Date): Promise<AxiosResponse<IGetScheduleResponse>> {
        const week = getWeekNumber(date)
        return $migaikApi.get<IGetScheduleResponse>(`/v1/group/${groupId}/${week}`)
    }
    static async searchGroup(): Promise<AxiosResponse<IUniversityGroup[]>> {
        return $migaikApi.get<IUniversityGroup[]>(`/v1/search/group?groupName= `)
    }
}