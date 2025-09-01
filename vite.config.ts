import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 깃허브 페이지 배포를 위한 설정입니다.
  // "/저장소-이름/" 부분을 실제 깃허브 저장소 이름으로 바꿔주세요!
  base: "/저장소-이름/",
})
