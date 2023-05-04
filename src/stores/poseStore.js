import { writable } from 'svelte/store';

export const videoParams = {
  height: 480, // Best to be square for mobile devices
  width: 480,
  frame: 24, //The offset for the frame user needs to be in
}

// Model of empty Pose
const poseTemplate = {
  available: false,
  onFrame: false,
  keypoints: [], //One meter units, relative to 2m cube around the person
  keypoints2D: [], //Relative to the camera, goof for framing
  angles: {},
}

const Pose = writable(poseTemplate);

// Reset function
export const resetPose = () => {
  Pose.update( () => {
    return poseTemplate
  })
}

// Set function, also a reset if given an empty array
export const setPose = (keypoints = [], keypoints2D = [] ) => {
  if (keypoints.length > 0) {
    Pose.update( pose => {
      return {
        available: true,
        keypoints: keypoints,
        keypoints2D: keypoints2D,
        angles: calculateAngles(keypoints),
        onFrame: checkFrame(pose, pose.onFrame)
      }
    })
  } else {
    resetPose()
  }
}

export default Pose;

// 3D keypoints are in the format [x, y]
function calculateAngles(keypoints) {
  const angleMap = {
    'leftElbow': [11, 13, 15],
    'rightElbow': [12, 14, 16],
    'leftKnee': [23, 25, 27],
    'rightKnee': [24, 26, 28],
    'leftShoulder': [14, 12, 24],
    'rightShoulder': [13, 11, 23],
    'leftHip': [12, 24, 26],
    'rightHip': [11, 23, 25],
  };

  const angles = {};

  for (const [jointName, jointIndices] of Object.entries(angleMap)) {
    const [a, b, c] = jointIndices.map(index => keypoints[index]);
    if (a && b && c) {
      const vectorAB = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
      const vectorCB = { x: b.x - c.x, y: b.y - c.y, z: b.z - c.z };
      const dotProduct = vectorAB.x * vectorCB.x + vectorAB.y * vectorCB.y + vectorAB.z * vectorCB.z;
      const magnitudeAB = Math.sqrt(vectorAB.x * vectorAB.x + vectorAB.y * vectorAB.y + vectorAB.z * vectorAB.z);
      const magnitudeCB = Math.sqrt(vectorCB.x * vectorCB.x + vectorCB.y * vectorCB.y + vectorCB.z * vectorCB.z);
      let radians = Math.acos(dotProduct / (magnitudeAB * magnitudeCB));
      let angle = (radians * 180 / Math.PI + 360) % 360;
      if (angle > 180) {
        angle = 360 - angle;
      }
      const score = Math.min(a.score, b.score, c.score);
      angles[jointName] = { angle: angle, score: score };
    }
  }
  return angles;
}




function checkFrame(pose, start_val = false) {
    if (pose.keypoints.length == 0) {
      return start_val
    }

    // Everything on cam check
    let critical_scores = [
      //Wrists
      Math.max( pose.keypoints[15].score, pose.keypoints[16].score ),
      //Foot
      Math.max( pose.keypoints[31].score, pose.keypoints[32].score ),
      //Hips
      Math.max( pose.keypoints[23].score, pose.keypoints[24].score ),
      //Shoulders
      Math.max( pose.keypoints[11].score, pose.keypoints[12].score ),
    ]

    const scoresGood = Math.min(...critical_scores) > 0.8 

    let frameGood = true
    let critPointIndexes = [ 15, 16, 31, 32, 23, 24, 11, 12 ]

    //Target square is drawn in PoseDetection.svelte
    critPointIndexes.forEach(i => {
      let point = pose.keypoints2D[i]
      if ( point.x > videoParams.height - videoParams.frame ||
           point.y > videoParams.width - videoParams.frame  ||
           point.x < videoParams.frame  ||
           point.y < videoParams.frame 
          ) {
        frameGood = false
      }
    })

    if ( !start_val) {
      return scoresGood && frameGood
    }

    if ( start_val && !scoresGood ) {
      return scoresGood && frameGood
    }

    return start_val

}

/*

0. nose
1. left_eye_inner
2. left_eye 
3. left_eye_outer 
4. right_eye_inner 
5. right_eye 
6. right_eye_outer 
7. left_ear 
8. right_ear 
9. mouth_left 
10. mouth_right 
11. left_shoulder 
12. right_shoulder 
13. left_elbow 
14. right_elbow 
15. left_wrist 
16. right_wrist 
17. left_pinky 
18. right_pinky 
19. left_index 
20. right_index 
21. left_thumb 
22. right_thumb 
23. left_hip 
24. right_hip 
25. left_knee 
26. right_knee 
27. left_ankle 
28. right_ankle 
29. left_heel 
30. right_heel 
31. left_foot_index 
32. right_foot_index

*/