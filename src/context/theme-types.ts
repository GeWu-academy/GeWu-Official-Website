export type Theme = 'white' | 'cream' | 'dark'

export interface ThemeOption {
  id: Theme
  name: string
  shortName: string
  desc: string
  icon: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'white',
    name: '纯白科技',
    shortName: '白色',
    desc: '素雅明净 · 现代几何',
    icon: 'Sun',
  },
  {
    id: 'cream',
    name: '米白书院',
    shortName: '米白',
    desc: '温润宣纸 · 雅致宋韵',
    icon: 'Feather',
  },
  {
    id: 'dark',
    name: '深邃暗夜',
    shortName: '暗色',
    desc: '黑曜晶石 · 赛博微光',
    icon: 'Moon',
  },
]
