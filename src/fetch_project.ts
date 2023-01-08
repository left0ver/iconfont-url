import axios from 'axios'
import { BASE_URL } from "./config";
import type { ProjectResponse, ProjectInfo } from './type'

export async function fetchProject(cookie: string, ctoken: string, isown_create: number) {
  let page = 1
  const t = new Date().getTime()
  let isLastPage = false

  const result: ProjectInfo[] = []
  while (!isLastPage) {
    const { data: ProjectResponse } = await axios.get<ProjectResponse>(`/user/myprojects.json`,
      {
        baseURL: BASE_URL,
        params: { page, isown_create, t, ctoken },
        headers: {
          cookie,
        }
      })

    const { data: ProjectResponseData, code, error_code = '', message = '' } = ProjectResponse

    if (code !== 200) {
      throw new Error(JSON.stringify({ message, error_code }));
    }
    // 是否是最后一页
    if (ProjectResponseData.pageSize * ProjectResponseData.page > ProjectResponseData.count) {
      isLastPage = true
    } else {
      page++
    }

    isown_create === 1 ? result.push(...ProjectResponseData.ownProjects) : result.push(...ProjectResponseData.corpProjects)
  }
  return result
}
