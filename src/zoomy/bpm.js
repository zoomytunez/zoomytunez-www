  // bpm calculation:

  // const speed = 26.82 / pace       // meters/sec
  // const height = heightmm / 10     // cm

  // const stride = 0.174 * height * speed - 0.75 * speed + 0.108 * height + 1.2

  // const speed_cm_min = speed * 100 * 60
  // const perMinute = speed_cm_min / stride
  // return perMinute

export default function bpm({height: h, pace: p}) {
  return 14900000/(h * p + 43.21 * h + 111.111 * p - 1862.5)
}

bpm.inverse = ({height: h, bpm: b}) =>
  (14900000 + 1862.5 * b - 43.21 * h * b) / (111.111 * b + h * b)