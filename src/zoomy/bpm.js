export default function bpm({height: heightmm, pace}) {
  const speed = 26.82 / pace       // meters/sec
  const height = heightmm / 10     // cm

  const stride = 0.174 * height * speed - 0.75 * speed + 0.108 * height + 1.2

  const speed_cm_min = speed * 100 * 60
  const perMinute = speed_cm_min / stride
  return perMinute
}