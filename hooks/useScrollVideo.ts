'use client'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

if (globalThis.window !== undefined) gsap.registerPlugin(ScrollTrigger)

export function useScrollVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  scrollWrapperId: string,
  triggerId: string
) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let targetTime = 0
    let renderedTime = 0
    let duration = 0

    const clampTime = (time: number) => Math.min(Math.max(time, 0), Math.max(duration - 0.016, 0))

    const applyTime = (nextTime: number) => {
      const clampedTime = clampTime(nextTime)

      if (Math.abs(clampedTime - video.currentTime) < 1 / 30) {
        return
      }

      if ('fastSeek' in video && typeof video.fastSeek === 'function') {
        video.fastSeek(clampedTime)
      } else {
        video.currentTime = clampedTime
      }
    }

    const tick = () => {
      renderedTime += (targetTime - renderedTime) * 0.18
      applyTime(renderedTime)
    }

    const syncFromScroll = (progress: number) => {
      targetTime = clampTime(progress * duration)
    }

    video.pause()
    video.currentTime = 0
    video.playsInline = true

    const trigger = ScrollTrigger.create({
      id: triggerId,
      trigger: `#${scrollWrapperId}`,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: self => {
        if (duration > 0) {
          syncFromScroll(self.progress)
        }
      },
    })

    const handleLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0
      renderedTime = clampTime(video.currentTime)
      targetTime = renderedTime
      syncFromScroll(trigger.progress)
      ScrollTrigger.refresh()
    }

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    }

    gsap.ticker.add(tick)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      gsap.ticker.remove(tick)
      video.pause()
      trigger.kill()
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [videoRef, scrollWrapperId, triggerId])
}