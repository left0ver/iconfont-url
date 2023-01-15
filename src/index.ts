import axios from 'axios'
import pick from 'lodash.pick'
import { parseCookie } from './parse_cookie'
import { getProject } from './getProject'
import { BASE_URL } from './config'
import type { FontDetail, FontUrl } from './type'

/**
 * @description 获取iconfont的项目的字体图标的在线链接
 * @param {string} projectName iconfont的项目名称,自己拥有的项目或者自己参与的项目
 * @param {string} cookie https://www.iconfont.cn 的 cookie
 * @return  项目中没有图标将return null
 */
export async function getOnlineUrl(projectName: string, cookie: string) {
  if (!cookie || !projectName)
    throw new Error('projectName and cookie field is required')

  const { ownProjects = [], corpProjects = [] } = await getProject(cookie)

  let curProject = ownProjects.find(project => project.name === projectName)
  // 在自己创建的项目中没找到该项目
  if (!curProject)
    curProject = corpProjects.find(project => project.name === projectName)

  // 自己创建的项目中和自己参与的项目中都没找到该项目
  if (!curProject)
    throw new Error(`not find the project named ${projectName}`)

  const pid = curProject.id
  const ctoken = parseCookie(cookie).ctoken
  const t = new Date().getTime()
  const { data: detailData } = await axios.get('/project/detail.json', { baseURL: BASE_URL, params: { pid, ctoken, t }, headers: { cookie } })

  const { code, error_code = '', message = 'message' } = detailData

  if (code !== 200)
    throw new Error(JSON.stringify({ message, error_code }))

  const fontDetail: FontDetail | null = detailData.data.font
  const fontUrl = fontDetail === null ? null : pick(fontDetail, ['css_file', 'css_font_face_src', 'eot_file', 'js_file', 'json_file', 'svg_file', 'ttf_file', 'woff2_file', 'woff_file']) as FontUrl
  return fontUrl
}

export type { FontUrl }
