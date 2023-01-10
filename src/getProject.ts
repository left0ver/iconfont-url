import { parseCookie } from './parse_cookie'
import { fetchProject } from './fetch_project'
import type { AllProjectResult } from './type'

export async function getProject(cookie: string) {
  if (cookie === '')
    throw new Error('need cookie')

  const cookieObj = parseCookie(cookie)
  const ctoken = cookieObj.ctoken
  if (!ctoken)
    throw new Error(' lack ctoken in cookie or cookie is wrong format')

  // 项目是不是自己创建的,1是自己创建的,2不是自己创建的,是自己参与的
  let isown_create = 1

  const allProject: AllProjectResult = {}
  try {
    const ownProject = await fetchProject(cookie, ctoken, isown_create)
    isown_create++
    const corpProjects = await fetchProject(cookie, ctoken, isown_create)

    allProject.ownProjects = ownProject
    allProject.corpProjects = corpProjects
  }
  catch (error) {
    console.error(error)
  }
  return allProject
}
