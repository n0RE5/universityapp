import { AxiosResponse } from "axios";
import { $migaikApi } from "..";
import { IGetScheduleResponse } from "../../types/migaik";
import getWeekNumber from "../../utils/getWeekNumber";

export default class MigaikService {
    static async getSchedule(date: Date): Promise<AxiosResponse<IGetScheduleResponse>> {
        const week = getWeekNumber(date)
        return $migaikApi.get<IGetScheduleResponse>(`v1/group/1424/${week}`)
    }
}