import { writable } from 'svelte/store';

// Model of empty Pose
const poseTemplate = {
  available: false,
  onFrame: false,
  keypoints: [],
  keypoints2D: [],
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
        keypoints2D: keypoints2D, //Delete this
        onFrame: checkFrame(pose, pose.onFrame)
      }
    })
  } else {
    resetPose()
  }
}

export default Pose;

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
      if ( point.x > 600 || point.y > 440 || point.x < 40 || point.y < 40 ) {
        frameGood = false
      }
    })

    if ( !start_val) {
      return scoresGood && frameGood
    }

    if ( start_val && !scoresGood ) 
    {
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