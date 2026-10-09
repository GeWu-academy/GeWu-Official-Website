import { create } from 'zustand'

export type SphereMode = 'celestial' | 'crystal' | 'constellation'

export interface UIStoreState {
  // 山长拜帖弹窗状态
  isMaintainerOpen: boolean
  openMaintainerModal: () => void
  closeMaintainerModal: () => void
  toggleMaintainerModal: () => void

  // 移动端折叠抽屉菜单
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void

  // 当前激活的研习方向 Tab
  activeDirectionTab: string
  setActiveDirectionTab: (tabId: string) => void

  // 格物乾坤仪交互模式
  sphereMode: SphereMode
  setSphereMode: (mode: SphereMode) => void
}

export const useUIStore = create<UIStoreState>((set) => ({
  isMaintainerOpen: false,
  openMaintainerModal: () => set({ isMaintainerOpen: true }),
  closeMaintainerModal: () => set({ isMaintainerOpen: false }),
  toggleMaintainerModal: () => set((state) => ({ isMaintainerOpen: !state.isMaintainerOpen })),

  isMobileMenuOpen: false,
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  activeDirectionTab: 'ai-agent',
  setActiveDirectionTab: (tabId: string) => set({ activeDirectionTab: tabId }),

  sphereMode: 'celestial',
  setSphereMode: (mode: SphereMode) => set({ sphereMode: mode }),
}))
