import process from 'process'
import axios from 'axios'
import pick from 'lodash.pick'
import { parseCookie } from './parse_cookie'
import { getProject } from './getProject'
import { BASE_URL } from './config'
import type { FontDetail, FontUrl } from './type'

/**
 * @description 获取iconfont的项目的字体图标的在线链接
 * @param {string} projectName iconfont的项目名称,自己拥有的项目或者自己参与的项目
 * @param {string} [cookie] 可选,先从环境变量中读取ICONFONT_COOKIE的值,没有则再读取传入的cookie
 * @return  项目中没有图标将return null
 */
export async function getOnlineUrl(projectName: string, cookie?: string) {
  const finalCookie = process.env.ICONFONT_COOKIE || cookie

  if (!finalCookie)
    throw new Error('cookie not find  in  environment variable , please input cookie or set FONT_COOKIE environment variable ')

  const { ownProjects = [], corpProjects = [] } = await getProject(finalCookie)

  let curProject = ownProjects.find(project => project.name === projectName)
  // 在自己创建的项目中没找到该项目
  if (!curProject)
    curProject = corpProjects.find(project => project.name === projectName)

  // 自己创建的项目中和自己参与的项目中都没找到该项目
  if (!curProject)
    throw new Error(`not find the project named ${projectName}`)

  const pid = curProject.id
  const ctoken = parseCookie(finalCookie).ctoken
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

getOnlineUrl('vue', 'ctoken=6e1Yzhl3KHCdorMPV56Pv0iB; cna=W/3aGwMnGiYCAWVQeLRp6Skp; xlly_s=1; EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlJVKsCyelzFFL8JjTAVNK-3jyCRMmszG1y4c25mFifA0KCTRNGsC3yO4F5BQ7TmkGklE3PTdw0HJK8iKAk8vOfcosi1out1fHvBNMvkz8FNSQ==; u=8520645; u.sig=s3SVY9PtAbD8LE5GAHj0_MUPeCU3Mgt8M0-Qb1rj7jU; isg=BHJyitcnRTdd0XkHHopIhzTEw75UA3ad0BSLjTxPiyXbzxTJJJMPrTVtvmvz1-41').then(res => console.log(res)).catch(err => console.log(err))
