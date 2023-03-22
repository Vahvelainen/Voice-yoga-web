import { writable } from 'svelte/store';

// Model of empty Pose
const poseTemplate = {
  available: false,
  keypoints: [],
}

const Pose = writable(poseTemplate);

// Reset function
export const resetPose = () => {
  Pose.update( () => {
    return poseTemplate
  })
}

// Set function, also a reset if given an empty array
export const setPose = (keypoints = [] ) => {
  if (keypoints.length > 0) {
    Pose.update( () => {
      return {
        available: true,
        keypoints: keypoints,
      }
    })
  } else {
    resetPose()
  }
}

export default Pose;
