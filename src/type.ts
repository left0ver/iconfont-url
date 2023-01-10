interface ErrorInfo {
  code: number
  error_code?: string
  message?: string
}

export interface ProjectInfo {
  id: number
  name: string
  guid: string
  create_user_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ProjectResponse extends ErrorInfo {
  data: {
    ownProjects: ProjectInfo[]
    count: number
    delProjects: ProjectInfo[]
    corpProjects: ProjectInfo[]
    page: number
    pageSize: number
  }
}

export interface AllProjectResult {
  ownProjects?: ProjectInfo[]
  corpProjects?: ProjectInfo[]
}

export interface FontDetail {
  svg_file: string
  woff_file: string
  woff2_file: string
  eot_file: string
  ttf_file: string
  js_file: string
  css_file: string
  demo_file: string
  json_file: string
  id: number
  owner_id: number
  owner_type: string
  css_font_face_src: string
  createdAt: Date
  updatedAt: Date
}

export type FontUrl = Pick<FontDetail, 'css_file' | 'css_font_face_src' | 'eot_file' | 'js_file' | 'json_file' | 'svg_file' | 'ttf_file' | 'woff2_file' | 'woff_file'>
