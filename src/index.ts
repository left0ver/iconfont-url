import process from "process";
import axios from 'axios'
import pick from 'lodash.pick'
import { parseCookie } from './parse_cookie'
import { getProject } from "./getProject";
import { BASE_URL } from "./config";
import type { FontDetail, FontUrl } from './type'

/**
 * @description 获取iconfont的项目的字体图标的在线链接
 * @param {string} projectName
 * @param {string} [cookie] 可选,先从环境变量中读取FONT_COOKIE的值,没有则再读取传入的cookie
 */
export async function getOnlineUrl(projectName: string, cookie?: string) {
  const finalCookie = process.env.FONT_COOKIE || cookie

  if (!finalCookie) {
    throw new Error(`cookie not find  in  environment variable , please input cookie or set FONT_COOKIE environment variable `);
  }

  const { ownProjects = [], corpProjects = [] } = await getProject(finalCookie)

  let curProject = ownProjects.find((project) => project.name === projectName)
  // 在自己创建的项目中没找到该项目
  if (!curProject) {
    curProject = corpProjects.find((project) => project.name === projectName)
  }
  // 自己创建的项目中和自己参与的项目中都没找到该项目
  if (!curProject) {
    throw new Error(`this projectName:${projectName} not find`);
  }

  const pid = curProject.id
  const ctoken = parseCookie(finalCookie).ctoken
  const t = new Date().getTime()
  const { data: detailData } = await axios.get('/project/detail.json', { baseURL: BASE_URL, params: { pid, ctoken, t }, headers: { cookie } })

  const { code, error_code = '', message = 'message' } = detailData

  if (code !== 200) {
    throw new Error(JSON.stringify({ message, error_code }));
  }
  const fontDetail: FontDetail | null = detailData.data.font
  const fontUrl = fontDetail === null ? null : pick(fontDetail, ['css_file', 'css_font_face_src', 'eot_file', 'js_file', 'json_file', 'svg_file', 'ttf_file', 'woff2_file', 'woff_file']) as FontUrl
  return fontUrl
}

export type { FontUrl }


